const { createClient } = require("redis");
const { Card } = require("../../libs/card-picker");

class CardService {
  static io;
  static redis;

  static async init(ioInstance) {
    this.io = ioInstance;
    this.redis = createClient({ url: "redis://localhost:6379" });
    this.redis.on("error", (err) => console.error("Redis error", err));
    await this.redis.connect();
  }

  static async addOrUpdateClient(uid, socketId) {
    const clientKey = `user:${uid}`;

    const existingData = await this.redis.hGetAll(clientKey);

    await this.redis.hSet(clientKey, {
      socketId,
      cardType: existingData.cardType || "",
      cardNumber: existingData.cardNumber || 0,
    });

    await this.redis.sAdd("connectedUsers", uid);

    this.io.sockets.sockets.get(socketId)?.join(`user:${uid}`);
  }


  static async getClient(uid) {
    return await this.redis.hGetAll(`user:${uid}`);
  }

  static async getClients() {
    const uids = await this.redis.sMembers("connectedUsers");
    const clients = [];

    for (const uid of uids) {
      const data = await this.getClient(uid);
      if (data && data.socketId) {
        clients.push([uid, data]);
      }
    }

    return clients;
  }

  static async resetClients() {
    const clients = await this.getClients();
    let successCount = 0;
    let failCount = 0;

    for (const [uid, context] of clients) {
      const { socketId } = context;
      if (!socketId) {
        failCount++;
        continue;
      }

      try {
        await this.io.in(socketId).disconnectSockets(true);
        successCount++;
      } catch {
        failCount++;
      }
    }

    await this.redis.del("connectedUsers");
    for (const [uid] of clients) {
      await this.redis.del(`user:${uid}`);
    }

    this.io.emit("clients", []);

    return {
      message: "Processing complete",
      totalClients: clients.length,
      success: successCount,
      failed: failCount,
    };
  }

  static async sendCards() {
    const clients = await this.getClients();
    const connectedClients = clients.map(([uid, { socketId }]) => ({
      clientId: uid,
      socketId,
    }));

    const clientIds = connectedClients.map((c) => c.clientId);

    const card = new Card(clientIds.length);
    card.assignToUsers(clientIds);

    let successCount = 0;
    let failCount = 0;

    for (const { socketId, clientId } of connectedClients) {
      try {
        if (!socketId) {
          failCount++;
          continue;
        }

        const assignedCard = card.getAssignedCards().get(clientId);
        if (!assignedCard) {
          failCount++;
          continue;
        }

        const { type: cardType, num: cardNumber } = assignedCard;

        await this.redis.hSet(`user:${clientId}`, {
          cardType,
          cardNumber,
        });

        this.io.to(socketId).emit("user:card", { cardType, cardNumber });

        successCount++;
      } catch {
        failCount++;
      }
    }

    const updated = await this.getClients()

    this.io.emit("clients", updated);

    return {
      message: "Processing complete",
      totalClients: connectedClients.length,
      success: successCount,
      failed: failCount,
    };
  }

  static async getNumberOfConnected() {
    const clients = await this.redis.sMembers("connectedUsers");
    return clients.length;
  }

  static async removeClient(uid, socketId) {
    await this.redis.sRem("connectedUsers", uid);
    await this.redis.del(`user:${uid}`);
  }
}

module.exports = CardService;


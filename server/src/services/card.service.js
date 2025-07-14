const MemoryDb = require("../../libs/memory-db");
const { Card } = require("../../libs/card-picker");

class CardService {
  static clients = new MemoryDb();
  static io;

  static setIO(ioInstance) {
    this.io = ioInstance;
  }

  static getClients() {
    return this.clients.entries();
  }

  static resetClients() {
    const connectedClients = this.getClients();

    let successCount = 0;
    let failCount = 0;

    try {
      for (const [uid, context] of connectedClients) {
        const socketId = context.socketId;
        if (!socketId) {
          failCount++;
          continue;
        }
        this.io.in(socketId).disconnectSockets(true);
        successCount++;
      }
    } catch {
      failCount++;
    }

    this.clients.reset();

    return {
      message: "Processing complete",
      totalClients: connectedClients.length,
      success: successCount,
      failed: failCount,
    };
  }

  static sendCards() {
    const connectedClients = this.getClients().map(([uid, { socketId }]) => ({
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

        this.clients.update(clientId, { cardType, cardNumber });
        this.io.to(socketId).emit("user:card", { cardType, cardNumber });

        successCount++;
      } catch {
        failCount++;
      }
    }

    return {
      message: "Processing complete",
      totalClients: connectedClients.length,
      success: successCount,
      failed: failCount,
    };
  }

  static addOrUpdateClient(uid, socketId) {
    if (!this.clients.has(uid)) {
      this.clients.set(uid, {
        cardNumber: 0,
        cardType: "",
        socketId,
      });
    } else {
      this.clients.update(uid, { socketId });
    }
  }

  static getClient(uid) {
    return this.clients.get(uid);
  }

  static getNumberOfConnected() {
    return this.io.of("/").sockets.size;
  }
}

module.exports = CardService;

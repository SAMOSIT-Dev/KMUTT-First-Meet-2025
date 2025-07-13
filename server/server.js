require("dotenv").config();

const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const cors = require("cors");

const MemoryDb = require("./libs/memory-db");
const { Card } = require("./libs/card-picker");
const { instrument } = require("@socket.io/admin-ui");

const clients = new MemoryDb();

const io = new Server(server, {
  //   path: "/socket",
  //   path: "/",
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://192.168.1.38:5173",
    ],
    credentials: true,
  },
  transports: ["polling", "websocket"],
});

instrument(io, {
  auth: false,
  mode: "development",
  // path: "/socket",
  readonly: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.static("./node_modules/@socket.io/admin-ui/ui/dist"));

app.get("/clients", (req, res) => {
  res.json({ clients: clients.entries() });
});

app.post("/clients/reset", (req, res) => {
  const connectedClients = clients.entries();

  let successCount = 0;
  let failCount = 0;

  try {
    for (const client of connectedClients) {
      const [uid, context] = client;
      const socketId = context.socketId;

      if (!socketId) {
        failCount++;
        continue;
      }

      io.in(socketId).disconnectSockets(true);
      successCount++;
    }
  } catch (error) {
    failCount++;
  }

  clients.reset();

  res.json({
    message: "Processing complete",
    totalClients: connectedClients.length,
    success: successCount,
    failed: failCount,
  });
});

app.post("/send/card", (req, res) => {
  const connectedClients = clients.entries().map(([uid, { socketId }]) => ({
    clientId: uid,
    socketId,
  }));

  const clientIds = connectedClients.map((client) => client.clientId);

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

      clients.update(clientId, { cardType, cardNumber });
      io.to(socketId).emit("user:card", { cardType, cardNumber });

      successCount++;
    } catch (error) {
      failCount++;
    }
  }

  res.json({
    message: "Processing complete",
    totalClients: connectedClients.length,
    success: successCount,
    failed: failCount,
  });
});

io.on("connect", (socket) => {
  io.emit("clients", clients.entries());
  io.emit("number-of-connected", io.of("/").sockets.size);

  socket.on("user:connected", (payload) => {
    const { uid } = payload || {};
    const socketId = socket.id;

    if (!uid || !socketId) return;

    if (!clients.has(uid)) {
      clients.set(uid, {
        cardNumber: 0,
        cardType: "",
        socketId,
      });
    } else {
      clients.update(uid, {
        socketId,
      });
    }

    const card = clients.get(uid);
    socket.emit("user:card", card);
  });

  socket.on("disconnect", (payload) => {
    io.emit("number-of-connected", io.of("/").sockets.size);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server is online!");
});

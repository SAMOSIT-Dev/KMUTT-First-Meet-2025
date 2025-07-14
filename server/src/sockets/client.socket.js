const CardService = require("../services/card.service");

function clientSocket(io, socket) {
  io.emit("clients", CardService.getClients());
  io.emit("number-of-connected", CardService.getNumberOfConnected());

  socket.on("user:connected", (payload) => {
    const { uid } = payload || {};
    const socketId = socket.id;

    if (!uid || !socketId) return;

    CardService.addOrUpdateClient(uid, socketId);

    const card = CardService.getClient(uid);
    socket.emit("user:card", card);
  });

  socket.on("disconnect", () => {
    io.emit("number-of-connected", CardService.getNumberOfConnected());
  });
}

module.exports = clientSocket;

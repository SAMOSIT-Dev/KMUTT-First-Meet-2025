const CardService = require("../services/card.service");

function clientSocket(io, socket) {
  const socketId = socket.id;

  CardService.getClients().then((clients) => {
    io.emit("clients", clients);
  });

  CardService.getNumberOfConnected().then((count) => {
    io.emit("number-of-connected", count);
  });

  socket.on("user:connected", async (payload) => {
    const { uid } = payload || {};

    if (!uid || !socketId) return;

    await CardService.addOrUpdateClient(uid, socketId);

    const card = await CardService.getClient(uid);

    socket.emit("user:card", card);

    const updatedClients = await CardService.getClients();
    const connectedCount = await CardService.getNumberOfConnected();

    io.emit("clients", updatedClients);
    io.emit("number-of-connected", connectedCount);
  });

  socket.on("user:disconnected", async (payload) => {
    const { uid } = payload || {};

    if (!uid) return;

    await CardService.removeClient(uid, socketId);

    const connectedCount = await CardService.getNumberOfConnected();
    const updatedClients = await CardService.getClients();

    io.emit("clients", updatedClients);
    io.emit("number-of-connected", connectedCount);
  });
}

module.exports = clientSocket;
require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const cardRoutes = require("./src/routes/card.routes");
const clientSocket = require("./src/sockets/client.socket");

const CardService = require("./src/services/card.service");

const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
  path: "/service/socket",
  transports: ["websocket"],
  pingInterval: 2000,
  pingTimeout: 5000,
});

instrument(io, {
  auth: false,
  mode: "development",
  readonly: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.use("/", cardRoutes);

io.on("connect", (socket) => {
  clientSocket(io, socket);
});

const pubClient = createClient({ url: "redis://127.0.0.1:6379" });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  
  io.on("connect", (socket) => {
    clientSocket(io, socket, pubClient);
  });
})

CardService.init(io, pubClient);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

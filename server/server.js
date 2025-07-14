require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const cardRoutes = require("./src/routes/card.routes");
const clientSocket = require("./src/sockets/client.socket");

const CardService = require("./src/services/card.service");

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://192.168.1.38:5173",
];

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    credentials: true,
  },
  transports: ["polling", "websocket"],
});

instrument(io, {
  auth: false,
  mode: "development",
  readonly: true,
});

CardService.setIO(io);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" })); 


app.use("/", cardRoutes); 

io.on("connect", (socket) => {
  clientSocket(io, socket);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "ws://localhost:3000";

const socketOptions = {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
};

export const socket: Socket = io(SOCKET_URL, socketOptions);

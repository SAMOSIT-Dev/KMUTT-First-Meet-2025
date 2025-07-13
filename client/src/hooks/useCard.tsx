import {
  createContext,
  use,
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { CardType } from "../components/Card";
import { useDeviceId } from "./useDeviceId";
import { socket } from "../libs/socket";
import type { Status } from "../components/StatusIndicator";
import { sleep } from "../libs/utils";

interface State {
  cardNumber?: number;
  cardType?: CardType | string;
  status?: Status;
}

const CardContext = createContext<State>({ cardNumber: 0, cardType: "" });

export function useCard() {
  const context = use(CardContext);
  if (!context) {
    throw new Error("useCard must be used within CardProivder");
  }
  return context;
}

export function CardProivder({ children }: PropsWithChildren) {
  const deviceId = useDeviceId().deviceId;
  const [card, setCard] = useState<State>({});
  const [status, setStatus] = useState<Status>("pending");

  const flashStatus = useCallback(async () => {
    setStatus("pending");
    await sleep(100);
    setStatus("connected");
  }, [status]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      setStatus("connected");
      socket.emit("user:connected", { uid: deviceId, socketId: socket.id });
    });

    socket.on("disconnect", () => {
      setStatus("disconnected");
    });

    socket.on("user:card", (payload) => {
      flashStatus();
      setCard(payload);
    });

    const handleUnload = () => {
      socket.emit("user:disconnect", {
        uid: deviceId,
        socketId: socket.id,
        reason: "exits",
      });
    };

    socket.on("connect_error", (error) => {
      setStatus("disconnected");
      console.error("Connection Error:", error);
    });

    window.addEventListener("unload", handleUnload);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return (
    <CardContext.Provider value={{ ...card, status }}>
      {children}
    </CardContext.Provider>
  );
}

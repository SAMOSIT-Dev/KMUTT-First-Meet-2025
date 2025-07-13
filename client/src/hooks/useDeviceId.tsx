import { createContext, use, useState, type PropsWithChildren } from "react";
import { v4 as uuid } from "uuid";

type State = {
  deviceId: string;
};

const Context = createContext<State | null>(null);

export function useDeviceId() {
  const context = use(Context);

  if (!context) {
    throw new Error("useDeviceId mut be used within DeviceIdProvider");
  }

  return context;
}

export function DeviceIdProvider({ children }: PropsWithChildren) {
  const [deviceId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedDeviceId = localStorage.getItem("device_id");
      if (storedDeviceId) {
        return storedDeviceId;
      }
    }

    const newId = uuid();
    if (typeof window !== "undefined") {
      localStorage.setItem("device_id", newId);
    }

    return newId;
  });

  return <Context.Provider value={{ deviceId }}>{children}</Context.Provider>;
}

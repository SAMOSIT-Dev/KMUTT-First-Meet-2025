import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DeviceIdProvider } from "./hooks/useDeviceId.tsx";
import { CardProivder } from "./hooks/useCard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DeviceIdProvider>
      <CardProivder>
        <App />
      </CardProivder>
    </DeviceIdProvider>
  </StrictMode>
);

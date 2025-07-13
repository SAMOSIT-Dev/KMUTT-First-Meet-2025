import { cn } from "../libs/utils";

export type Status = "connected" | "disconnected" | "pending";

const mapStatusToColor: Record<Status, string> = {
  connected: "bg-teal-500",
  disconnected: "bg-red-500",
  pending: "bg-amber-500",
} as const;

interface StatusIndicatorProps {
  status: Status;
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        "flex flex-col size-2 rounded-full p-px",
        mapStatusToColor[status] ?? "bg-zinc-700"
      )}
    ></span>
  );
}

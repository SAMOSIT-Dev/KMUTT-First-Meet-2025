import type { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="max-w-lg mx-auto h-screen px-5 fixed inset-0 flex flex-col">{children}</div>
  );
}

import type { ComponentProps } from "react";

export default function DiamondIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="512"
      height="512"
      x="0"
      y="0"
      viewBox="0 0 60.002 60.002"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="m51.301 28.403-21-28c-.191-.255-.498-.424-.812-.4a1.002 1.002 0 0 0-.802.419l-20 28a.998.998 0 0 0-.006 1.154l21 30a1 1 0 0 0 .819.427h.012c.33-.004.637-.171.82-.445l20-30a.996.996 0 0 0-.031-1.155z"
          fill="currentColor"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}

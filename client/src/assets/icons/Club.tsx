import type { ComponentProps } from "react";

export default function ClubIcon({ ...props }: ComponentProps<"svg">) {
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
      viewBox="0 0 216 216"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M161.668 75.201c1.882-5.679 2.832-11.604 2.832-17.701C164.5 26.346 139.154 1 108 1S51.5 26.346 51.5 57.5c0 6.097.95 12.022 2.832 17.701C24.179 76.345 0 101.232 0 131.66c0 31.154 25.346 56.5 56.5 56.5 14.44 0 27.629-5.45 37.628-14.396L81.962 215h51.733l-12.293-41.665c10.054 9.199 23.43 14.825 38.098 14.825 31.154 0 56.5-25.346 56.5-56.5 0-30.428-24.179-55.315-54.332-56.459z"
          fill="currentColor"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}

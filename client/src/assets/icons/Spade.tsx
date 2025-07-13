import type { ComponentProps } from "react";

export default function SpadeIcon({ ...props }: ComponentProps<"svg">) {
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
      viewBox="0 0 23.64 23.64"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M6.995 19.049c2.077 0 3.852-1.48 4.827-2.5.976 1.02 2.746 2.5 4.823 2.5 3.576 0 6.076-2.494 6.076-6.063 0-3.935-3.103-6.479-6.104-8.938-1.417-1.162-2.885-2.362-4.01-3.696A.993.993 0 0 0 11.85 0h-.058a.997.997 0 0 0-.758.352c-1.126 1.332-2.593 2.533-4.01 3.695C4.022 6.506.918 9.049.918 12.985c.001 3.57 2.499 6.064 6.077 6.064z"
          fill="currentColor"
          data-original="#030104"
        ></path>
        <path
          d="M8.109 23.64a21.293 21.293 0 0 1 7.422 0c-2.455-3.692-3.711-10.833-3.711-10.833s-1.237 7.141-3.711 10.833z"
          fill="currentColor"
          data-original="#030104"
        ></path>
      </g>
    </svg>
  );
}

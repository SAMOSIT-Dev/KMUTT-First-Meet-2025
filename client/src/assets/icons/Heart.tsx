import type { ComponentProps } from "react";

export default function HeartIcon({ ...props }: ComponentProps<"svg">) {
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
      viewBox="0 0 59.945 59.945"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M58.598 12.729C56.757 8.025 53.242 4.418 48.7 2.571c-1.964-.798-3.953-1.203-5.91-1.203-6.509 0-11.063 4.358-12.84 6.401-1.768-2.05-6.302-6.426-12.809-6.426-1.951 0-3.934.404-5.895 1.201-4.542 1.847-8.058 5.454-9.899 10.157-1.964 5.019-1.773 10.707.525 15.608 3.263 6.957 10.681 17.788 27.49 29.872l.583.42.583-.42C47.42 46.037 54.83 35.247 58.071 28.334c2.3-4.899 2.491-10.587.527-15.605z"
          fill="currentColor"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}

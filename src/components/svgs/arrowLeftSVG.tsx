import { FC } from "react";

export interface ArrowLeftProps {}
export const ArrowLeftSVG: FC<ArrowLeftProps> = (props) => {
  return (
    <svg
      width="20px"
      height="auto"
      fill="#000000"
      viewBox="0 0 32 32"
      version="1.1"
    >
      <path d="M23.505 0c0.271 0 0.549 0.107 0.757 0.316 0.417 0.417 0.417 1.098 0 1.515l-14.258 14.264 14.050 14.050c0.417 0.417 0.417 1.098 0 1.515s-1.098 0.417-1.515 0l-14.807-14.807c-0.417-0.417-0.417-1.098 0-1.515l15.015-15.022c0.208-0.208 0.486-0.316 0.757-0.316z"></path>
    </svg>
  );
};

import { FC, PropsWithChildren } from "react";

export interface ButtonProps {
  onClick?: () => void;
}
export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  return (
    <button
      className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      {props.children}
    </button>
  );
};

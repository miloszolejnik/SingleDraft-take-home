import { FC } from "react";
import { XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

type ToggleButtonProps = {
  state: boolean;
  setState: (state: boolean) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ExpandButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      <XMarkIcon />
    </button>
  );
};

export const ToggleButton: FC<ToggleButtonProps> = ({ state, setState, children, ...props }) => {
  return (
    <button className="font-bold hover:text-gray-700 transition-colors flex items-center justify-center" {...props} onClick={() => setState(!state)} >{children}</button>
  );
};

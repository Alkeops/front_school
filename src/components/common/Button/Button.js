import cn from "classnames";
import s from "./Button.module.scss";
const PREFIX = "button";

export const Button = ({ children, label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(s[PREFIX], {
        [className]: className,
      })}
    >
      {label || children}
    </button>
  );
};

import cn from "classnames";
import s from "./Section.module.scss";
const PREFIX = "section";

export const Section = ({ title, variant, children }) => {
  return (
    <div
      className={cn(s[PREFIX], {
        [s[`${PREFIX}--${variant}`]]: variant,
      })}
    >
      <span className={s[`${PREFIX}__title`]}>{title}</span>
      <div className={`${s[`${PREFIX}__content`]} section-content`}>{children}</div>
    </div>
  );
};

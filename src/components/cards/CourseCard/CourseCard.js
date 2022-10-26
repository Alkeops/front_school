import cn from "classnames";
import { Button } from "components/common";
import s from "./CourseCard.module.scss";

const PREFIX = "course-card";

const colors = {
  1: "green",
  2: "yellow",
  3: "transparent",
  4: "salmon",
  5: "purple",
};
export const CourseCard = ({
  onClick,
  name,
  description,
  price,
  tags,
  students,
  type,
  subscribed,
}) => {
  const color = colors[Math.floor(Math.random() * 5) + 1];
  return (
    <div
      className={cn(s[PREFIX], {
        [s[`${PREFIX}--${color}`]]: color,
      })}
    >
      <div className={s[`${PREFIX}__data`]}>
        <span className={s[`${PREFIX}__data-name`]}>{name}</span>
        <p className={s[`${PREFIX}__data-description`]}>{description}</p>
        <span className={s[`${PREFIX}__data-price`]}>${price}</span>
      </div>
      <div className={s[`${PREFIX}__tags`]}>
        {tags.map((tag, i) =>
          i > 1 ? null : (
            <span key={i} className={s[`${PREFIX}__tags-t`]}>
              {tag}
            </span>
          )
        )}
      </div>
      <div className={s[`${PREFIX}__students`]}>
        Alumnos inscritos: {students.length}
      </div>
      {type !== "admin" ? (
        <Button
          onClick={onClick}
          className={cn(s[`${PREFIX}__button`], "card-button")}
        >
          {subscribed ? "Darse de baja" : "Inscribirse"}
        </Button>
      ) : null}
    </div>
  );
};

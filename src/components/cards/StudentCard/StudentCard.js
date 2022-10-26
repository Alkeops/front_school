import { useCourses } from "@hooks";
import cn from "classnames";
import s from "./StudentCard.module.scss";
const PREFIX = "student-card";

export const StudentCard = ({ name, username, courses, friends }) => {
  const { data: listCourses } = useCourses();
  return (
    <div className={cn(s[PREFIX])}>
      <div className={s[`${PREFIX}__header`]}>
        <div className={s[`${PREFIX}__header-picture`]} />
        <div className={s[`${PREFIX}__data`]}>
          <span className={s[`${PREFIX}__data-name`]}>{name}</span>
          <span className={s[`${PREFIX}__data-username`]}>{username}</span>
        </div>
      </div>
      <div className={s[`${PREFIX}__content`]}>
        <div className={s[`${PREFIX}__friends`]}>
          <span>Total de amigos: {friends.length}</span>
        </div>
        <div className={s[`${PREFIX}__courses`]}>
          <span>Total de cursos: {courses.length}</span>
          {courses.map((course) => (
            <span key={course}>
              {listCourses.find(({ _id }) => _id === course).name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

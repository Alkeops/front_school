import { ToggleTheme } from "components";

import cn from "classnames";
import s from "./Navbar.module.scss";
import { useCourses, useStudent, useStudents } from "@hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
const PREFIX = "navbar";

export const Navbar = () => {
  const router = useRouter();
  const { user } = router.query;
  const queryClient = useQueryClient();
  useCourses();
  const students = useStudents();
  const student = useStudent(user);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(s[PREFIX])}>
      <div className={s[`${PREFIX}__content`]}>
        <span className={s[`${PREFIX}__title`]}>School</span>
        <div className={s[`${PREFIX}__right`]}>
          <div className={s[`${PREFIX}__user-data`]}>
            <span>Ver la perspectiva de:</span>
            <span
              className={s[`${PREFIX}__user`]}
              onClick={() => setIsOpen(!isOpen)}
            >
              {student?.data?.username || "admin"}
            </span>
            {isOpen ? (
              <div className={s[`${PREFIX}__menu`]}>
                {[...students.data, { username: "admin" }].map((_student) => (
                  <div
                    className={s[`${PREFIX}__menu-item`]}
                    onClick={() => {
                      router.push(`/${_student.username}`);
                      queryClient.invalidateQueries(["student"]);
                      setIsOpen(false);
                    }}
                  >
                    {_student.username}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
};

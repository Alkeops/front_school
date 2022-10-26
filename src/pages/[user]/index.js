import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import { useCourses, useStudents, useStudent } from "@hooks";
import { CourseCard, Section, StudentCard } from "@components";

import cn from "classnames";
import s from "./user.module.scss";
const PREFIX = "user";

export default function User() {
  const router = useRouter();
  const { user } = router.query;
  const queryClient = useQueryClient();
  const { data: courses } = useCourses();
  const { data: students } = useStudents();
  const { data: student } = useStudent(user);
  const [list, setList] = useState({
    courses: [],
    friends: [],
  });

  //TODO refactor
  useEffect(() => {
    if (user !== "admin" && student && students && courses) {
      let _courses = student?.courses?.map((course) =>
        courses.find((c) => c._id === course)
      );
      let _friends = student?.friends?.map((friend) =>
        students.find((s) => s._id === friend)
      );
      setList({
        courses: _courses,
        friends: _friends,
      });
    }
  }, [student, students, courses]);

  return (
    
    <div className={cn(s[PREFIX])}>
      <span className={s[`${PREFIX}__welcome`]}>
        ¡Hola! {student?.name || "Admin"} es un gusto tenerte de vuelta
      </span>
      {user !== "admin" && list.courses?.length ? (
        <Section title="Mis cursos">
          {list.courses?.map(
            ({ _id, name, description, price, tags, students }) => (
              <CourseCard
                key={_id}
                name={name}
                description={description}
                price={price}
                tags={tags}
                students={students}
                subscribed
                type={"own"}
                onClick={() => {
                  fetch(
                    `http://localhost:3005/api/v1/courses/subscription/${_id}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        studentId: student._id,
                      }),
                    }
                  )
                    .then((res) => res.json())
                    .then(() => {
                      queryClient.invalidateQueries(["student"]);
                      queryClient.invalidateQueries(["courses"]);
                    });
                }}
              />
            )
          )}
        </Section>
      ) : null}
      {list.friends?.length || user === "admin" ? (
        <Section
          title={user !== "admin" ? "Amigos" : "Todos los estudiantes"}
          variant="friends"
        >
          {user !== "admin"
            ? list.friends?.map((friend) => (
                <StudentCard
                  key={friend._id}
                  name={friend.name}
                  username={friend.username}
                  courses={friend.courses}
                  friends={friend.friends}
                />
              ))
            : students?.map((friend) => (
                <StudentCard
                  key={friend._id}
                  name={friend.name}
                  username={friend.username}
                  courses={friend.courses}
                  friends={friend.friends}
                />
              ))}
        </Section>
      ) : null}
      <Section title="Todos los cursos">
        {courses?.map(({ _id, name, description, price, tags, students }) => (
          <CourseCard
            key={_id}
            name={name}
            description={description}
            price={price}
            tags={tags}
            students={students}
            subscribed={student?.courses?.includes(_id)}
            type={user}
            onClick={() => {
              fetch(
                `http://localhost:3005/api/v1/courses/subscription/${_id}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    studentId: student._id,
                  }),
                }
              )
                .then((res) => res.json())
                .then(() => {
                  queryClient.invalidateQueries(["student"]);
                  queryClient.invalidateQueries(["courses"]);
                });
            }}
          />
        ))}
      </Section>
    </div>
  );
}

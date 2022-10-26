import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useCourses = () => {
  return useQuery(["courses"], () =>
    fetch(`http://localhost:3005/api/v1/courses`).then((res) => res.json())
  );
};

export const useStudents = () => {
  return useQuery(["students"], () =>
    fetch(`http://localhost:3005/api/v1/students`).then((res) => res.json())
  );
};

export const useStudent = (user) => {
  if (!user) return useStudents();
  return useQuery(["student", user], () =>
    fetch(`http://localhost:3005/api/v1/students/${user}`).then((res) =>
      res.json()
    )
  );
};

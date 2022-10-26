import { useQuery } from "@tanstack/react-query";

export const useCourses = () => {
  return useQuery(["courses"], () =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`).then((res) =>
      res.json()
    )
  );
};

export const useStudents = () => {
  return useQuery(["students"], () =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/students`).then((res) =>
      res.json()
    )
  );
};

export const useStudent = (user) => {
  if (!user) return useStudents();
  return useQuery(["student", user], () =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${user}`).then((res) =>
      res.json()
    )
  );
};

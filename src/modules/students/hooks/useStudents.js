import { useQuery } from "@tanstack/react-query";
import { getAll } from "../api/students";

export default function useStudents() {
    return useQuery({
        queryKey: ["students"],
        queryFn: getAll,
    });
}

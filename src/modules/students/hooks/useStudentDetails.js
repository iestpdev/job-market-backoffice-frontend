import { useQuery } from "@tanstack/react-query";
import { getById } from "../api/students";

export default function useStudentDetails(id) {
    return useQuery({
        queryKey: ["student", id],
        queryFn: () => getById(id),
        enabled: !!id,
    });
}
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../api/tutors";

export default function useTutors() {
    return useQuery({
        queryKey: ["tutors"],
        queryFn: getAll,
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
}

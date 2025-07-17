import { useQuery } from "@tanstack/react-query";
import { getById } from "../api/tutors";

export default function useTutorDetails(id) {
    return useQuery({
        queryKey: ["tutor", id],
        queryFn: () => getById(id),
        enabled: !!id, // solo se ejecuta si hay un ID válido
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
}

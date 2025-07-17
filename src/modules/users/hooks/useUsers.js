import { useQuery } from "@tanstack/react-query";
import { getAll } from "../api/users";

export default function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: getAll,
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
}

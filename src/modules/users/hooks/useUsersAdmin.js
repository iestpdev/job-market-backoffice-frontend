import { useQuery } from "@tanstack/react-query";
import { getAllUsersAdmin } from "../api/users";

export default function useUsersAdmin() {
    return useQuery({
        queryKey: ["usersAdmin"],
        queryFn: getAllUsersAdmin,
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
}

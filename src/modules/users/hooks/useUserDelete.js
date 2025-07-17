import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteById } from "../api/users";

export default function useUserDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteById,
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        },
        onError: (err) => {
            console.error("Error al eliminar usuario:", err);
            alert("No se pudo eliminar el usuario");
        },
    });
}

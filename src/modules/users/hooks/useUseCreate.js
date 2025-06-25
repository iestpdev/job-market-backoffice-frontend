import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "../api/users";

export default function useUserCreate(onSuccess) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: create,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["users"]);
            if (onSuccess) onSuccess(data);
        },
        onError: (err) => {
            console.error("Error al crear usuario:", err);
            alert("No se pudo crear el usuario");
        },
    });
}

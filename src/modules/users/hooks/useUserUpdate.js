import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateById } from "../api/users";
import { showSuccess, showError } from "../../shared/components/toast/toast";

export default function useUserUpdate(id, onSuccess) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData) => updateById(id, formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["users"]);
            showSuccess("Usuario actualizado correctamente");
            if (onSuccess) onSuccess(data);
        },
        onError: (error) => {
            console.error(error);
            showError("Error al actualizar el usuario");
        },
    });
}

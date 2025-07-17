import { useMutation } from "@tanstack/react-query";
import { updateByIdWithFormData } from "../api/students";
import { showSuccess, showError } from "../../shared/components/toast/toast";

export default function useStudentUpdate(id, onSuccess) {
    return useMutation({
        mutationFn: async (formData) => await updateByIdWithFormData(id, formData),
        onSuccess: (_, variables) => {
            showSuccess("Cambios guardados correctamente");
            if (onSuccess) onSuccess(variables);
        },
        onError: (error) => {
            console.error(error);
            showError("Error al actualizar el alumno");
        },
    });
}
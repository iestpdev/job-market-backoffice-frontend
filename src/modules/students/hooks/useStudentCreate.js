import { useMutation } from "@tanstack/react-query";
import { create } from "../api/students";
import { showSuccess, showError } from "../../shared/components/toast/toast";

export default function useStudentCreate(onSuccess) {
    return useMutation({
        mutationFn: async (formData) => await create(formData),
        onSuccess: (_, variables) => {
            showSuccess("Alumno creado correctamente");
            if (onSuccess) onSuccess(variables);
        },
        onError: (error) => {
            console.error(error);
            showError("Error al crear el alumno");
        },
    });
}
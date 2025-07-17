import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWithFormData } from "../api/companies";
import { showSuccess, showError } from "../../shared/components/toast/toast";

export default function useCompanyCreate(onSuccess) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => await createWithFormData(formData),
        onSuccess: () => {
            showSuccess("Empresa registrada correctamente");
            queryClient.invalidateQueries(["companies"]);
            if (onSuccess) onSuccess();
        },
        onError: (error) => {
            console.error(error);
            showError("Error al registrar la empresa");
        }
    });
}
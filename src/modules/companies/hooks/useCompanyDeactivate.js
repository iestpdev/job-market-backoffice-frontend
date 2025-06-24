import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivate } from "../api/companies";
import { showSuccess, showError } from "../../shared/components/toast/toast";

export default function useCompanyDeactivate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => await deactivate(id),
        onSuccess: () => {
            showSuccess("Empresa desactivada correctamente");
            queryClient.invalidateQueries(["companies"]);
        },
        onError: (error) => {
            console.error(error);
            showError("Error al desactivar la empresa");
        }
    });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activate } from "../api/companies";
import { showSuccess, showError } from "../../shared/components/toast/toast";

export default function useCompanyActivate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => await activate(id),
        onSuccess: () => {
            showSuccess("Empresa activada correctamente");
            queryClient.invalidateQueries(["companies"]);
        },
        onError: (error) => {
            console.error(error);
            showError("Error al activar la empresa");
        }
    });
}
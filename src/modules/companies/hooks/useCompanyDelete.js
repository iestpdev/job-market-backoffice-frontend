import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteById } from "../api/companies";
import { showSuccess, showError } from "../../shared/components/toast/toast";

export default function useCompanyDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => await deleteById(id),
        onSuccess: () => {
            showSuccess("Empresa eliminada correctamente");
            queryClient.invalidateQueries(["companies"]);
        },
        onError: (error) => {
            console.error(error);
            showError("Error al eliminar la empresa");
        }
    });
}
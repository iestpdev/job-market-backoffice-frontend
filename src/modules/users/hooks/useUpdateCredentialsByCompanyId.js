import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCredentialsByCompanyId } from "../api/users";

const useUpdateCredentialsByCompanyId = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ companyId, user }) => {
            if (!companyId) {
                throw new Error("El companyId no está definido");
            }
            return updateCredentialsByCompanyId(companyId, user);
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["company", variables.companyId]);
        },
        onError: (error) => {
            console.error("Error al actualizar el usuario por EMPRESA_ID:", error);
            // Manejo de error del servidor
            if (error.response) {
                return error.response.data?.message || "Error desconocido";
            }
            return "Error al actualizar el usuario";
        },
    });
};

export default useUpdateCredentialsByCompanyId;

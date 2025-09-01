import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCredentialsByStudentId } from "../api/users";

const useUpdateCredentialsByStudentId = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ studentId, user }) => {
            if (!studentId) {
                throw new Error("El studentId no está definido");
            }
            return updateCredentialsByStudentId(studentId, user);
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["student", variables.studentId]);
        },
        onError: (error) => {
            console.error("Error al actualizar el usuario por ALUMNO_ID:", error);
            // Manejo de error del servidor
            if (error.response) {
                return error.response.data?.message || "Error desconocido";
            }
            return "Error al actualizar el usuario";
        },
    });
};

export default useUpdateCredentialsByStudentId;

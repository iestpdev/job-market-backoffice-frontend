import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateByTutorId } from "../api/users";

const useUpdateByTutorId = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ tutorId, user }) => {
            if (!tutorId) {
                throw new Error("El tutorId no está definido");
            }
            return updateByTutorId(tutorId, user);
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["user", variables.tutorId]);
        },
        onError: (error) => {
            console.error("Error al actualizar el usuario por TUTOR_ID:", error);
            // Manejo de error del servidor
            if (error.response) {
                return error.response.data?.message || "Error desconocido";
            }
            return "Error al actualizar el usuario";
        },
    });
};

export default useUpdateByTutorId;

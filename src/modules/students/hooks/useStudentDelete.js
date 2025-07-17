import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteById } from "../api/students";
import { showSuccess, showError } from "../../shared/components/toast/toast";

export default function useStudentDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => await deleteById(id),
        onSuccess: () => {
            showSuccess("Alumno eliminado correctamente");
            queryClient.invalidateQueries(["students"]);
        },
        onError: (error) => {
            console.error(error);
            showError("Error al eliminar el alumno");
        }
    });
}
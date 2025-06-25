import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteById } from "../api/tutors";

export default function useTutorDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteById,
        onSuccess: () => {
            queryClient.invalidateQueries(["tutors"]);
        },
    });
}

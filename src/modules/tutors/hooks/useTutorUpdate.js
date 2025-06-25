import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateById } from "../api/tutors";

export default function useTutorUpdate(id, onSuccess) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData) => updateById(id, formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["tutors"]);
            queryClient.invalidateQueries(["tutor", id]);
            if (onSuccess) onSuccess(data);
        },
    });
}

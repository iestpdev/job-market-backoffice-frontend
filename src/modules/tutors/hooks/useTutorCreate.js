import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerTutor } from "../../auth/api/auth-register";

export default function useTutorCreate(onSuccess) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registerTutor,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["tutors"]);
            if (onSuccess) onSuccess(data);
        },
    });
}

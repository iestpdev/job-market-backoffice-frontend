import { useMutation } from "@tanstack/react-query";
import { registerStudent } from "../../auth/api/auth-register";

export default function useStudentCreate(onSuccess) {
    return useMutation({
        mutationFn: registerStudent,
        onSuccess: (data) => {
            if (onSuccess) onSuccess(data);
        },
    });
}

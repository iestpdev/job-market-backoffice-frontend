import { useMutation } from "@tanstack/react-query";
import { registerCompany } from "../../auth/api/auth-register";

export default function useCompanyCreate(onSuccess) {
    return useMutation({
        mutationFn: registerCompany,
        onSuccess: (data) => {
            if (onSuccess) onSuccess(data);
        },
    });
}
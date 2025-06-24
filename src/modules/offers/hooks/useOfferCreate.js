import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "../api/offers";

export default function useOfferCreate(onSuccess) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: create,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["offers"]);
            if (onSuccess) onSuccess(data);
        }
    });
}
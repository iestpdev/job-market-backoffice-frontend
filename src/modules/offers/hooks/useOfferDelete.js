import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteById } from "../api/offers";

export default function useOfferDelete() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteById,
        onSuccess: () => {
            queryClient.invalidateQueries(["offers"]);
        }
    });
}
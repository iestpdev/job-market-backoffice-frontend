import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateById } from "../api/offers";

export default function useOfferUpdate(id, onSuccess) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (offer) => updateById(id, offer),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["offers"]);
            if (onSuccess) onSuccess(data);
        }
    });
}
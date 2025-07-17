import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateById } from "../api/offers";

export default function useOfferUpdate(id, onSuccess) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (offerData) => updateById(id, offerData),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["offers"]);
            if (onSuccess) onSuccess(data);
        },
        onError: (error) => {
            console.error("Error al actualizar oferta:", error);
            alert("Ocurrió un error al actualizar la oferta.");
        }
    });
}

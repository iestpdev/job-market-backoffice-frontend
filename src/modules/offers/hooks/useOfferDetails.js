import { useQuery } from "@tanstack/react-query";
import { getById } from "../api/offers";

export default function useOfferDetails(id) {
    return useQuery({
        queryKey: ["offer", id],
        queryFn: () => getById(id),
        enabled: !!id,
        retry: 1,
        staleTime: 1000 * 60 * 5,
    });
}

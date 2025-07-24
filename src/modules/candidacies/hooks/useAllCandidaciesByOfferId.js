import { useQuery } from "@tanstack/react-query";
import { getAllByOfferId } from "../api/candidacies";

export const useAllCandidaciesByOfferId = (offerId) => {
    return useQuery({
        queryKey: ["candidaciesByOffer", offerId],
        queryFn: () => getAllByOfferId(offerId),
        enabled: !!offerId,
    });
};

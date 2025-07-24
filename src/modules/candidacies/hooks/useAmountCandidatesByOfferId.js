import { useQuery } from "@tanstack/react-query";
import { getAmountCandidatesByOfferId } from "../api/candidacies";

export const useAmountCandidatesByOfferId = (offerId) => {
    return useQuery({
        queryKey: ["amountCandidates", offerId],
        queryFn: () => getAmountCandidatesByOfferId(offerId),
        enabled: !!offerId,
        staleTime: 1000 * 60 * 5,
    });
};

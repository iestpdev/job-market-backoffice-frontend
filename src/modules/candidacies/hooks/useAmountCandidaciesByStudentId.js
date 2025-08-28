import { useQuery } from "@tanstack/react-query";
import { getAmountCandidaciesByStudentId } from "../api/candidacies";

export const useAmountCandidaciesByStudentId = (studentId) => {
    return useQuery({
        queryKey: ["amountCandidacies", studentId],
        queryFn: () => getAmountCandidaciesByStudentId(studentId),
        enabled: !!studentId,
        staleTime: 1000 * 60 * 5,
    });
};

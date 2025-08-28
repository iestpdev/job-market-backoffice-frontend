import { useQuery } from "@tanstack/react-query";
import { getAllByStudentId } from "../api/candidacies";

export const useAllCandidaciesByStudentId = (studentId) => {
    return useQuery({
        queryKey: ["candidaciesByStudent", studentId],
        queryFn: () => getAllByStudentId(studentId),
        enabled: !!studentId,
    });
};

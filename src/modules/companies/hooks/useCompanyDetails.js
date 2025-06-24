import { useQuery } from "@tanstack/react-query";
import { getById } from "../api/companies";

export default function useCompanyDetails(id) {
    return useQuery({
        queryKey: ["company", id],
        queryFn: () => getById(id),
        enabled: !!id,
    });
}
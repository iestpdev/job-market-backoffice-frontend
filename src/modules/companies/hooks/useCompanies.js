import { useQuery } from "@tanstack/react-query";
import { getAll } from "../api/companies";

export default function useCompanies() {
    return useQuery({
        queryKey: ["companies"],
        queryFn: getAll,
    });
}
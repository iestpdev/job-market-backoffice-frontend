import { useQuery } from "@tanstack/react-query";
import { getAll } from "../api/offers";

export default function useOffers() {
    return useQuery({
        queryKey: ["offers"],
        queryFn: getAll
    });
}
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/Apicabins";

export function useCabins() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { cabins, isLoading };
}

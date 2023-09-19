import { useQuery } from "@tanstack/react-query";
import { authorize } from "../../services/Auth";

export function useUser() {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: authorize,
  });

  return { user, userLoading, isAuthenticated: user?.role === "authenticated" };
}

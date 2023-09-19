import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPi } from "../../services/Auth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryclient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading: isLoggingout } = useMutation({
    mutationFn: logoutAPi,
    onSuccess: () => {
      queryclient.removeQueries(), navigate("/login", { replace: true });
    },
  });
  return { logout, isLoggingout };
}

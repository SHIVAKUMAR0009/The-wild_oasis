import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/Auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const { mutate: login, isLoading: loggingin } = useMutation({
    //best to calll mutationfn as mtfn:()=>function name|||dont call mtfn:()=>{
    //function name}
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      console.log(data);
      queryclient.setQueryData(["user"], data.user);
      // queryclient.invalidateQueries({ queryKey: ["user"] });
      toast.success("loggedIn");

      navigate("/dashboard", { replace: true });
    },
    onError: () => toast.error("invalid credentials"),
  });
  return { login, loggingin };
}

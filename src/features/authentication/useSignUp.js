import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/Auth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signup, isLoading: loadingSignup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        "user Created Successfully please verify the new Account from the data's email address"
      );
    },
  });
  return { signup, loadingSignup };
}

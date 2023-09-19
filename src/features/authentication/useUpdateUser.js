import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/Auth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryclient = useQueryClient();
  const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: ({ password, name, avatar }) =>
      updateCurrentUser({ password, name, avatar }),
    onSuccess: ({ user }) => {
      queryclient.setQueryData(["user"], user);
      //   queryclient.invalidateQueries({ queryKey: ["user"] });
      toast.success("user updated successfully");
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });
  return { update, isUpdating };
}

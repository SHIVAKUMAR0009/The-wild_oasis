import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryclient = useQueryClient();
  const { mutate: updateesetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success(" settings updated succesfully");
      queryclient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateesetting, isUpdating };
}

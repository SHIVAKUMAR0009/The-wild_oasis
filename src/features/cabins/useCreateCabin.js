import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/Apicabins";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
  const queryclient = useQueryClient();
  const { mutate: addcabin, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("new cabin added succesfully");
      queryclient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addcabin, isCreating };
}

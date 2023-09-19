import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/Apicabins";
import { toast } from "react-hot-toast";

export function useEditcabin() {
  const queryclient = useQueryClient();
  const { mutate: editcabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabindata, id }) => createCabin(newCabindata, id),
    onSuccess: () => {
      toast.success(" cabin edit succesfully");
      queryclient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { editcabin, isEditing };
}

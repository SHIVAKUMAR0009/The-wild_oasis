import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deletebook } from "../../services/apiBookings";
export function useDelete() {
  const queryclient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => {
      deletebook(bookingId);
    },
    onSuccess: () => {
      toast.success(`booking successfully deleted`);
      queryclient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => {
      toast.error("some went wrong in deleting a booking");
    },
  });
  return { deleteBooking, isDeleting };
}

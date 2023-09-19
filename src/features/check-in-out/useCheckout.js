import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const queryclient = useQueryClient();
  // const navigate = useNavigate();
  const { mutate: checkout, isLoading: checkingout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`succesfully checkedout #${data.id} `);
      queryclient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("something went wrong with checking out"),
  });

  return { checkout, checkingout };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useChecking() {
  const queryclient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: checkingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`succesfully checkedIn #${data.id} `);
      queryclient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("something went wrong with checking in"),
  });

  return { checkin, checkingIn };
}

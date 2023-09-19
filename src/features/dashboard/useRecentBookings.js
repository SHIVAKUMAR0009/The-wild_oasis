import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const currentpastdate = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), currentpastdate).toISOString(); //bcz supabase accepts only ISO formatted Dates
  const { data: bookingsdata, isLoading: boookingLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookingsdate", `last${currentpastdate}`],
  });
  return { bookingsdata, boookingLoading, currentpastdate };
}

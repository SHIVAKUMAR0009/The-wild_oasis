import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useRecentDStays() {
  const { data: currentdata, isLoading: loadingcurrent } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });
  return { currentdata, loadingcurrent };
}

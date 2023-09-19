import { useQuery, useQueryClient } from "@tanstack/react-query";
import { booking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  ////filter
  const filtervalue = searchParams.get("status");

  const filter =
    !filtervalue || filtervalue === "all"
      ? null
      : { field: "status", value: filtervalue };
  ////////sort
  const sortdata = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortdata.split("-");
  const sortBy = { field, direction };
  //////////////pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  ///query
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => booking({ filter, sortBy, page }),
  });

  ////prefetch the data////
  const pagecount = Math.ceil(count / PAGE_SIZE);
  if (page < pagecount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => booking({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => booking({ filter, sortBy, page: page - 1 }),
    });
  return { bookings, error, isLoading, count };
}

import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const {
    bookingsdata,
    boookingLoading,
    currentpastdate: SpecifiedFilteredTime,
  } = useRecentBookings();
  const { stayLoading, confirmedStays } = useRecentStays();
  const { cabins, isLoading } = useCabins();

  if (boookingLoading || stayLoading || isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookingsdata}
        confirmedstays={confirmedStays}
        SpecifiedFilteredTime={SpecifiedFilteredTime}
        numCabins={cabins?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookingsdata={bookingsdata} numDays={SpecifiedFilteredTime} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

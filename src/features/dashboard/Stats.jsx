/* eslint-disable react/prop-types */
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
// icon, title, value, color;
function Stats({ bookings, confirmedstays, numCabins, SpecifiedFilteredTime }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const checkins = confirmedstays.length;

  //occupancy rate== total nights spent by allGuests in a specified time possible number of nights ie total cabins
  const totalguestsnights =
    confirmedstays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numCabins * SpecifiedFilteredTime);

  return (
    <>
      <Stat
        title="bookings"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
      />
      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={checkins}
      />
      <Stat
        title="Occupancy Rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(totalguestsnights * 100) + "%"}
      />
    </>
  );
}

export default Stats;

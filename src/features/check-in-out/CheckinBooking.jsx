import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useEffect, useState } from "react";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useChecking } from "./useChecking";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmed, setconfirmed] = useState(false);
  const [breakfast, setbreakfast] = useState(false);

  const { isLoading, booking } = useBooking();
  const { isLoading: settingsloading, settings } = useSettings();
  console.log(settings);
  // console.log(booking);
  useEffect(
    function () {
      setconfirmed(booking?.isPaid ?? false);
    },
    [booking]
  );
  const moveBack = useMoveBack();
  const { checkin, checkingIn } = useChecking();

  if (isLoading || settingsloading || checkingIn) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const latebreakfastprice = settings.breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (!confirmed) return;
    if (!breakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: latebreakfastprice,
          totalPrice: totalPrice + latebreakfastprice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={breakfast}
            id="breakfast"
            onChange={() => {
              setbreakfast((breakfast) => !breakfast), setconfirmed(false);
            }}
          >
            want to add breakfast Price {formatCurrency(latebreakfastprice)}
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          checked={confirmed}
          disabled={confirmed || checkingIn}
          id="confirm"
          onChange={() => setconfirmed((confirmed) => !confirmed)}
        >
          I confirm that {guests.name} has Paid the{" "}
          {!breakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + latebreakfastprice
              )} (${formatCurrency(totalPrice)}+${formatCurrency(
                latebreakfastprice
              )})`}
          {/* {formatCurrency(totalPrice + latebreakfastprice)`${
            formatCurrency(totalPrice) + formatCurrency(latebreakfastprice)
          } `} */}
        </CheckBox>
      </Box>
      <ButtonGroup>
        {/* {
          unconfirmed
        } */}
        <Button onClick={handleCheckin} disabled={!confirmed || checkingIn}>
          Check in booking #{bookingId}{" "}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

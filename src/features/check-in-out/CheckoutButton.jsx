/* eslint-disable react/prop-types */
import { useCheckout } from "./useCheckout";
import Button from "../../ui/Button";
// import { Link } from "react-router-dom";
function CheckoutButton({ bookingId }) {
  const { checkout, checkingout } = useCheckout();
  return (
    <Button
      variation="primary"
      // as={Link}
      disabled={checkingout}
      size="small"
      onClick={() => checkout(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;

/* eslint-disable react/prop-types */
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/Apicabins";
import CreateCabinForm from "./CreateCabinForm";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  // const [showform, setshowform] = useState(false);
  const { addcabin, isCreating } = useCreateCabin();
  const {
    id: cabinID,
    name,
    maxCapacity,
    RegularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleduplicate() {
    addcabin({
      name: `copy of ${name}`,
      maxCapacity,
      RegularPrice,
      discount,
      image,
      description,
    });
  }
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: cabindelete } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} guests</div>
        <Price>{formatCurrency(RegularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinID} />
              <Menus.List id={cabinID}>
                <Menus.Button
                  icons={<HiSquare2Stack />}
                  disabled={isCreating}
                  onClick={() => handleduplicate()}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open modaltoopen="edit-form">
                  <Menus.Button icons={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open modaltoopen="delete-cabin">
                  <Menus.Button icons={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit-form">
              <CreateCabinForm editcabindata={cabin} />
            </Modal.Window>

            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                resourceName="cabins"
                onConfirm={() => cabindelete(cabinID)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
          {/* <Menus.Menu>
            <Menus.Toggle id={cabinID} />
            <Menus.List id={cabinID}>
              <Menus.Button
                icons={<HiSquare2Stack />}
                onClick={() => handleduplicate()}
              >
                Duplicate
              </Menus.Button>
              <Menus.Button icons={<HiPencil />}>Edit</Menus.Button>
              <Menus.Button icons={<HiTrash />}>Delete</Menus.Button>
            </Menus.List>
          </Menus.Menu> */}
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;

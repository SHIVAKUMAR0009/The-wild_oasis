import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open modaltoopen="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
    /////reuseable compoound component modal
  );
  // return (
  //   <div>
  //     <Button onClick={() => SetOpenModal((modal) => !modal)}>
  //       Add New Cabin
  //     </Button>
  //     {isOpenModal && (
  //       <Modal closeModal={() => SetOpenModal(false)}>
  //         <CreateCabinForm closeModal={() => SetOpenModal(false)} />
  //       </Modal>
  //     )}
  //   </div>
  // );
}

export default AddCabin;

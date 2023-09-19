/* eslint-disable react/prop-types */
// import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import { useCreateCabin } from "./useCreateCabin";
import { useEditcabin } from "./useEditcabin";
// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;
// eslint-disable-next-line react/prop-types
function CreateCabinForm({ editcabindata = {}, closeModal }) {
  const { id: editId, ...editvalues } = editcabindata;

  const editSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editSession ? editvalues : {},
  });
  const { addcabin, isCreating } = useCreateCabin();
  const { editcabin, isEditing } = useEditcabin();
  // const val = getValues.RegularPrice;
  // console.log(val);
  const { errors } = formState;
  console.log(errors);
  // const { mutate: addcabin, isLoading: isCreating } = useMutation({
  //   mutationFn: createCabin,
  //   onSuccess: () => {
  //     toast.success("new cabin added succesfully");
  //     queryclient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //     reset();
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  // const { mutate: editcabin, isLoading: isEditing } = useMutation({
  //   const queryclient = useQueryClient();
  //   mutationFn: ({ newCabindata, id }) => createCabin(newCabindata, id),
  //   onSuccess: () => {
  //     toast.success(" cabin edit succesfully");
  //     queryclient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //     reset();
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });
  const isWorking = isCreating || isEditing;
  function handleform(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (editSession)
      editcabin(
        { newCabindata: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    else {
      addcabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            closeModal?.();
          },
        }
      );
    }
    // mutate({ ...data, image: data.image[0] });
    // console.log(data);
  }
  // eslint-disable-next-line no-unused-vars
  function onError(error) {}

  if (isWorking) return <Spinner />;
  return (
    <Form
      onSubmit={handleSubmit(handleform, onError)}
      type={closeModal ? "modal" : "regular"}
    >
      {/* <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "this field is required ",//////////we created custom formrow so that we can reduce code 
            which takes in an children as input and errors and label as props
          })}
        />

        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow> */}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "this field is required ",
          })}
        />
      </FormRow>

      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        {/* <Label h="maxCapacity">Maximum capacity</Label> */}
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: " should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="RegularPrice" error={errors?.RegularPrice?.message}>
        {/* <Label htmlFor="RegularPrice">Regular price</Label> */}
        <Input
          type="number"
          id="RegularPrice"
          disabled={isCreating}
          {...register("RegularPrice", {
            required: "this field is required",
            min: {
              value: 1,
              message: " should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        {/* <Label htmlFor="discount">Discount</Label> */}
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().RegularPrice) ||
              "discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        {/* <Label htmlFor="description">Description for website</Label> */}
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        {/* <Label htmlFor="image">Cabin photo</Label> */}
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: editSession ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {editSession ? "edit cabin" : "addcabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

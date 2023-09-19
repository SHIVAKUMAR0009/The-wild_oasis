import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { set } from "date-fns";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { name: currentFullName },
    },
  } = useUser();

  const [name, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const { update, isUpdating } = useUpdateUser();

  function handlecancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    update(
      { name, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={name}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handlecancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating} s>
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const { errors } = formState;
  const { signup, loadingSignup } = useSignUp();
  function handler({ name, email, password }) {
    signup({ name, email, password }, { onSettled: () => reset });
    // console.log(data);
  }
  return (
    <Form onSubmit={handleSubmit(handler)}>
      <FormRow label="Full name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={loadingSignup}
          {...register("name", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={loadingSignup}
          {...register("email", {
            required: "this field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "please provide a valid Email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={loadingSignup}
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "password should be 8 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={loadingSignup}
          {...register("passwordConfirm", {
            required: "this field is required",
            validate: (value) =>
              value === getValues().password || "passwords should match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={loadingSignup}>
          Cancel
        </Button>
        <Button disabled={loadingSignup}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

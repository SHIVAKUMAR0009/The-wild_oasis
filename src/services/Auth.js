import { supabase, supabaseUrl } from "./supabase";

export async function signup({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar: "",
      },
    },
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { data };
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}
export async function authorize() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
    throw new Error("someThing went wrong with fetching user");
  }
  //   console.log(data);
  return data?.user;
}
export async function logout() {
  const { error } = supabase.auth.signOut();
  if (error) {
    throw new Error(error);
  }
}
export async function updateCurrentUser({ name, password, avatar }) {
  // const bucketurl =
  //   "https://fwmejnmvtfhwycgpadfi.supabase.co/storage/v1/object/public/avatars/";
  ///1)update name or password
  let updateData;
  if (password) updateData = { password };
  if (name) updateData = { data: { name } };
  console.log(updateData);
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error);
  }
  if (!avatar) return data;
  // const fileName=https://fwmejnmvtfhwycgpadfi.supabase.co/storage/v1/object/public/avatars/cabin-001.jpg?t=2023-09-15T13%3A31%3A39.716Z
  let fileName = `avatar-${data.user.id}-${Math.random()}`;
  //upload avatar
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError);
  //update user with avatar

  const { data: updatedUser, error: updateerror } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateerror) {
    throw new Error(error);
  }
  return updatedUser;
}

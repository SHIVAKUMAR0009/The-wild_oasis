import { supabase, supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cannot load data");
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cannot delete cabin");
  }
  return data;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function createCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("cannot create cabin");
  }
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);
  if (storageError) await supabase.from("cabins").delete().eq("id", data.id);

  return data;
}

// https://fwmejnmvtfhwycgpadfi.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg
// https://fwmejnmvtfhwycgpadfi.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg?t=2023-09-05T06%3A31%3A32.983Z

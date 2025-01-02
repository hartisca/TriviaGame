import { supabase } from "../supabase/supabaseClient";
import { toast } from "react-toastify";

export const signUpWithOtp = async (email) => {
  try {
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      throw new Error(error.message);
    }
    return true;
  } catch (error) {
    toast.error("There was an error with the magic link: " + error.message);
    return false;
  }
}

export const checkProfile = async (user) =>{
  console.log('Comprobación de usuario en checkProfile', user.id)
  if (!user) {
    toast.error("User is not authenticated.");
    return;
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
      if (error && error.code !== "PGRST116") { // Código PGRST116: "No rows found"
        throw new Error(error.message);
      }
  
      return data;
  } catch (error) {
    toast.error('Error checking profile: ', + error.mesage)
  }
}

export const upsertProfile = async ({ user, username, avatarUrl }) => {
  try {
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    if (existingUser && existingUser.id !== user.id) {
      throw new Error("Username is already taken.");
    }

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        username,
        avatar_url: avatarUrl || null,
      });

    if (error) throw new Error(error.message);

    toast.success("Profile updated successfully!");
  } catch (error) {
    toast.error("Error updating profile: " + error.message);
    throw error;
  }
};

export const uploadAvatar = async (user, file) => {
  try {
    const folderName = user.id;
    const fileName = "avatar.png";
    const filePath = `${folderName}/${fileName}`;

    // Subir el archivo
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw new Error(uploadError.message);

    // Obtener la URL pública del archivo
    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const avatarUrl = `${publicUrlData.publicUrl}?timestamp=${new Date().getTime()}`;
    return avatarUrl;
  } catch (error) {
    toast.error("Error uploading avatar: " + error.message);
    throw error;
  }
};
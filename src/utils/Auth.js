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
    return null
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

export const upsertTime = async ({ user, best_times }) => {
  try {
    // Verifica si el tiempo nuevo es mejor que el existente, o si el usuario no tiene un tiempo registrado
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("best_times, username")
      .eq("id", user.id)
      .single();

    // Si no existe un tiempo o el nuevo es mejor, realiza el upsert
    if (!existingUser || existingUser.best_times === null || best_times < existingUser.best_times) {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          best_times: best_times,
          username: existingUser.username, // Actualiza solo el tiempo
        });

      if (error) throw new Error(error.message);

      toast.success("You beat your best time mark!");
    } else {
      toast.info("Your current best time is better than the new one.");
    }
  } catch (error) {
    toast.error("Error updating best time: " + error.message);
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

export const fetchTopTimes = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, avatar_url, best_times')
      .order('best_times')
      .limit(5)

      if(error){
        throw error
      }
      
      return data
  } catch (error) {
    console.error('Error fetching top times: ', error)
    return []
  }
}
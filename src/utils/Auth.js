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
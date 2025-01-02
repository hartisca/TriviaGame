import Button from "../components/ui/Button";
import { toast } from "react-toastify";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function LoginScreen() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const validateEmail = (email) => {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      toast.error("Please verify that you are not a robot.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setIsSubmitting(true);
      await supabase.auth.signInWithOtp({ email });
      navigate("/")
      toast.success("Check and confirm in your email!");
      
    } catch (error) {
      console.error("There was an error with the magic link", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="login">      
      <div className="item">
        <h2>Get a link</h2>
        <form onSubmit={handleRegister}>          
        <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ReCAPTCHA
            sitekey={ import.meta.env.VITE_CAPTCHA_KEY } 
            onChange={setCaptchaValue}
          />
          <Button text={"Submit"} disabled={isSubmitting} />
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
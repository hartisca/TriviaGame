import Button from "../components/ui/Button";
import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { toast } from "react-toastify";
import profileDefault from "../assets/usuario.png"
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  const [ avatar, setAvatar ] = useState({
    file: null,
    url: "",
  });
  const [ username, setUsername ] = useState("");
  const [ error, setError ] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate()
  
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),       
      });      
    }    
  };
  
  const handleProfile = async (e) => {
    e.preventDefault();

    // No permitir enviar el formulario si el username es vacío y el perfil aún no existe
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    try {
      let avatarUrl = null;

      // Solo consultar el username si es necesario (si no se ha creado el perfil)
      if (username) {
        const { data: existingUser } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", username)
          .single();

        if (existingUser && existingUser.id !== user.id) {
          toast.error("Username is already taken.");
          return;
        }
      }

      if (avatar.file) {
        const folderName = user.id;
        const fileName = "avatar.png"; // Nombre fijo para el archivo dentro de la carpeta
        const filePath = `${folderName}/${fileName}`;

        // Subir la nueva imagen
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatar.file);

        if (uploadError) throw uploadError;

        // Obtener la URL pública del avatar
        avatarUrl = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath).data.publicUrl;
      }

      // Insertar o actualizar perfil en la tabla
      const { error: insertError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id, // ID del usuario autenticado
          username,
          avatar_url: avatarUrl, // Puede ser null
        });

      if (insertError) throw insertError;

      setError("");
      toast.success("Profile created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error creating profile", err.message);
      setError(err.message || "Something went wrong");
    }
  };  

  return (
    <div className="login">
      <div className="item">
        <h2>Create your profile</h2>
        <form onSubmit={handleProfile}>
          <label htmlFor="file">
            <img
              src={ avatar.url || profileDefault }
              alt="Profile avatar"
            />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={ handleAvatar }
          />          
          <input
            type="text"
            placeholder="User Name"
            name="userName"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          { error && <p style= {{ color: "red" }}> { error } </p> }
          <Button text={"Submit"} />
        </form>
      </div>
    </div>
  );
}

export default UserInfo;
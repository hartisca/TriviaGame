function UseInfo() {

  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  });

  const navigate = useNavigate();

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleRegister = async (e) => {
      e.preventDefault();
      const form = e.target;
      const username = form.userName.value;
      const email = form.email.value;
      const password = form.password.value;
    
      try {
        // Crear el usuario sin enviar correo de confirmación
        const { data: signUpData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        }, {
          // Desactivar el envío de correo de confirmación
          sendConfirmationEmail: false
        });
    
        if (authError) throw authError;
        if (!signUpData.user) throw new Error("User creation failed.");
    
        // Si el usuario se registró correctamente, se considera autenticado
        const session = supabase.auth.session();
        if (session) {
          // Subir imagen si está disponible
          let profileImageUrl = null;
          if (avatar.file) {
            const fileName = `${signUpData.user.id}/${avatar.file.name}`;
            const { data: storageData, error: storageError } = await supabase.storage
              .from("avatars")
              .upload(fileName, avatar.file);
            if (storageError) throw storageError;
    
            const { publicUrl } = supabase.storage.from("avatars").getPublicUrl(storageData.path);
            profileImageUrl = publicUrl;
          }
    
          // Guardar el perfil en la base de datos
          const { error: dbError } = await supabase.from("profiles").insert([{
            id: signUpData.user.id,
            username,
            email,
            avatar_url: profileImageUrl,
          }]);
          if (dbError) throw dbError;
    
          toast.success("Account created successfully!");
          navigate("/");
    
        } else {
          // Si no hay sesión activa, se informa que algo salió mal
          toast.error("Something went wrong. Please try again.");
        }
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
    };

  return ( 
    <div className="login">      
      <div className="item">
        <h2>Get a link</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || profileDefault} alt="Profile avatar" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="User Name" name="userName" required />
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <Button text={"Register"} />
        </form>
      </div>
    </div>
  );
}

export default UseInfo;
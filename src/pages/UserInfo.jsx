import Button from "../components/ui/Button";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import profileDefault from "../assets/usuario.png"
import { useAuth } from "../utils/AuthContext";
import { checkProfile, upsertProfile, uploadAvatar } from "../utils/Auth";

function UserInfo() {
  const [ avatar, setAvatar ] = useState({
    file: null,
    url: "",
  });
  const [ username, setUsername ] = useState("");
  const [ error, setError ] = useState("");
  const { user } = useAuth();  

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await checkProfile(user);
      if (profile) {
        setUsername(profile.username || "");
        setAvatar({ file: null, url: profile.avatar_url || "" });
      }
    };

    if (user) fetchProfile();
  }, [user]);
  
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
  
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }
  
    try {
      let avatarUrl = avatar.url;
  
      if (avatar.file) {
        avatarUrl = await uploadAvatar(user, avatar.file);
      }
  
      await upsertProfile({
        user,
        username,
        avatarUrl,
      });
  
      setAvatar({ ...avatar, url: avatarUrl });
  
      setError("");      
  
    } catch (err) {
      console.error("Error creating/updating profile", err.message);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Create your profile</h2>
        <form onSubmit={ handleProfile }>
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
            value={ username }
            onChange={ (e) => setUsername(e.target.value) }
          />
          { error && <p style={{ color: "red" }}> {error} </p> }
          <Button text={ "Submit" } />
        </form>
      </div>
    </div>
  );
}

export default UserInfo;
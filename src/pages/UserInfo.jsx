import Button from "../components/ui/Button";
import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { toast } from "react-toastify";
import profileDefault from "../assets/usuario.png"

function UserInfo() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSession()
  }, []);

  async function fetchSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      setError(error)
      return null
    }
    console.log(data?.session)
    return data?.session
  }

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
    
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Create your profile</h2>
        <form onSubmit={handleProfile}>
          <label htmlFor="file">
            <img
              src={avatar.url || profileDefault}
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button text={"Submit"} />
        </form>
      </div>
    </div>
  );
}

export default UserInfo;
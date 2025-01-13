import { useNavigate } from "react-router-dom";
import ScareCrow from "../assets/Scarecrow.png"
import Button from "../components/ui/Button"

function NotFound() {
  const navigate = useNavigate()
  return ( 
    <div className="display">
      <div className="display__img">
        <img src={ScareCrow} alt="404-Scarecrow" />
      </div>
      <div className="display__content">
        <h2 className="display__content--info">I have bad news for you</h2>
        <p className="display__content--text">
          The page you are looking for might be removed or is temporarily
          unavailable
        </p>
        <Button text={"Back to homepage"} onClick={() => navigate("/")} />
      </div>
    </div>
   );
}

export default NotFound;
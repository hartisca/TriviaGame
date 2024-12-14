import logo from "../assets/logo.png"
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

function HomeScreen() {

  const navigate = useNavigate()

  const handleStartPlaying = () => {
    navigate("/play")
  }
  return (
    <>
      <section className="HomeSection">
        <img src={logo} alt="Quizzbro logo" width="550px" />
        <Button text={"Start Playing"} onClick={handleStartPlaying} />
      </section>      
    </>    
  );
}

export default HomeScreen;

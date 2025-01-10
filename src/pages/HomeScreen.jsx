import logo from "../assets/logo.png"
import Button from "../components/ui/Button";
import { useNavigate, Link } from "react-router-dom";

function HomeScreen() {

  const navigate = useNavigate()

  const handleStartPlaying = () => {
    navigate("/play")
  }
  return (
    <>
      <section className="HomeSection">
        <img src={logo} alt="Quizzbro logo" width="550px" />
        <strong>Rules of the game: </strong><p className="rules">Every 3 correct answers, you will get a more difficult question from a random category. If you answer correctly, that category will be marked as completed. When you have completed all the categories, you win. Be careful you have only 30 questions!</p>
        <p className="rules"><Link to="/register">Register</Link> if you want to get in the laderboard!</p>
        <Button text={"Start Playing"} onClick={handleStartPlaying} />
      </section>      
    </>    
  );
}

export default HomeScreen;

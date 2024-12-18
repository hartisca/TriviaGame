import { useState, useEffect, useRef } from 'react';
import { fetchQuestion, fetchHardQuestion } from '../services/api/fetchdata';
import Count from '../components/Count';
import Timer from '../components/Timer';
import Marks from '../components/Marks';
import { useNavigate } from 'react-router-dom';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function PlayScreen() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);  
  const [hardQuestion, setHardQuestion] = useState(null);
  const navigate = useNavigate()
  const timeRef = useRef({ hours: 0, minutes: 0, seconds: 0 });

  

  const [categories, setCategories] = useState([
    { name: "Arts & Literature", done: false, aliases: ["arts", "literature", "arts_and_literature", "novels"] },
    { name: "General Knowledge", done: false, aliases: ["general_knowledge"] },
    { name: "Geography", done: false, aliases: ["geography"] },
    { name: "History", done: false, aliases: ["history"] },
    { name: "Science", done: false, aliases: ["science"] },
  ]);

  useEffect(() => {     
    const getQuestions = async () => {
      const quest = await fetchQuestion(30);
      if (quest) {
        setQuestions(quest);
      }
    };
    getQuestions();    
  }, []);

  const updateTime = (currentTime) => {
    timeRef.current = currentTime;
  }; 

  const updateCategories = async () => {    

    const updatedCategories = categories.map((cat) =>
      cat.name.toLowerCase() === hardQuestion.category.toLowerCase() ||
      cat.aliases.some((alias) => alias.toLowerCase() === hardQuestion.category.toLowerCase())
        ? { ...cat, done: true }
        : cat
    );
    setCategories(updatedCategories);
    //Comprobación de si quedan categorias o no
    const remainingCategories = updatedCategories.filter((cat) => !cat.done);
    if (remainingCategories.length === 0) {
      const finalTime = timeRef.current;
      const formattedTime = `${String(finalTime.hours).padStart(2, "0")}:${String(
        finalTime.minutes
      ).padStart(2, "0")}:${String(finalTime.seconds).padStart(2, "0")}`;

      alert(`Has ganado! Tiempo: ${formattedTime}`);
      localStorage.setItem("finalTime", JSON.stringify(finalTime));
      navigate("/classification");
    }
  }

  const fetchHard = async () => {  
    const hardQuestionData = await fetchHardQuestion(
      categories.filter((cat) => !cat.done).map((cat) => cat.aliases[0])
    );

    if (hardQuestionData) {
      setHardQuestion({
        question: hardQuestionData[0].question.text,
        correctAnswer: hardQuestionData[0].correctAnswer,
        incorrectAnswers: hardQuestionData[0].incorrectAnswers,
        category: hardQuestionData[0].category,
      });
    }
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentIndex];

  const handleClick = (selectedAnswer) => {
    if (hardQuestion) {
      // Evaluar respuesta de la pregunta difícil
      if (selectedAnswer === hardQuestion.correctAnswer) { 
        // Llamar actualización categorias
        updateCategories()        
      } else {
        setIncorrectCount((prev) => prev + 1);
      }
  
      // Volver a preguntas normales
      setHardQuestion(null);
    } else {
      // Evaluar respuesta de preguntas normales
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setCorrectCount((prevCorrect) => {
          const newCorrectCount = prevCorrect + 1;
  
          // Revisar si es momento de hacer una pregunta difícil
          if (newCorrectCount % 3 === 0) {
            fetchHard();
          }
  
          return newCorrectCount;
        });
      } else {
        setIncorrectCount((prev) => prev + 1);
      }
  
      // Avanzar a la siguiente pregunta normal
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        alert(`Juego terminado. Correctas: ${correctCount}, Incorrectas: ${incorrectCount}`);
      }
    }
  };  

  const answers = hardQuestion
    ? [hardQuestion.correctAnswer, ...hardQuestion.incorrectAnswers]
    : [currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers];

  const shuffledAnswers = shuffleArray(answers);

  return (
    <>
      <div className="container">
        <div className="leftContainer">
          <div className="timerContainer">
            <Timer onTimeUpdate={updateTime} />
          </div>
          <div>
            <Marks categories={categories} />
          </div>
        </div>

        <div className="mainArea">
          <div className="questionDiv">
            {hardQuestion ? (
              <p>{hardQuestion.question || "Loading hard question..."}</p>
            ) : (
              <p>{currentQuestion?.question?.text || "Loading question..."}</p>
            )}
          </div>
          <ul className="optionList">
            {shuffledAnswers.map((answer, index) => (
              <li
                key={index}
                className="questionOption"
                onClick={() => handleClick(answer)}
              >
                {answer}
              </li>
            ))}
          </ul>
        </div>
        <div className="aciertosFallos">
          <Count aciertos={correctCount} fallos={incorrectCount} />
        </div>
      </div>
    </>
  );
}

export default PlayScreen;
import { useState, useEffect } from 'react';
import fetchQuestion from '../services/api/fetchdata';
import Count from '../components/Count';
import Timer from '../components/Timer';
import Marks from '../components/Marks';

// Función para barajar un array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function PlayScreen() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    const getQuestions = async () => {
      const quest = await fetchQuestion(30);
      if (quest) {
        setQuestions(quest);
      }
    };
    getQuestions();
  }, []);

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  // Obtener la pregunta y respuestas actuales
  const currentQuestion = questions[currentIndex];
  const answers = [
    currentQuestion.correctAnswer,
    ...currentQuestion.incorrectAnswers
  ];

  const shuffledAnswers = shuffleArray(answers);

  const handleClick = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectCount(correctCount + 1);
    } else {
      setIncorrectCount(incorrectCount + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert(`Juego terminado. Correctas: ${correctCount}, Incorrectas: ${incorrectCount}`);
    }
  };

  return (
    <>
      <div className="container">
        <div className='leftContainer'>
           <div className="timerContainer">
            <Timer />          
          </div>
          <div>
            <Marks />
          </div>
        </div>
       
        <div className="mainArea">
          <div className="questionDiv">
            <p>{currentQuestion?.question?.text || 'Loading.'}</p>
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
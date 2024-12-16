import { useState, useEffect } from 'react';
import { fetchQuestion, fetchHardQuestion } from '../services/api/fetchdata';
import Count from '../components/Count';
import Timer from '../components/Timer';
import Marks from '../components/Marks';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function PlayScreen() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);  
  const [hardQuestion, setHardQuestion] = useState(null);
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

  const fetchHardAndUpdateCategory = async () => {
    const availableCategories = categories.filter((cat) => !cat.done);
    if (availableCategories.length === 0) {
      alert("Has ganado!");
      return;
    }

    const hardQuestionData = await fetchHardQuestion(
      availableCategories.map((cat) => cat.name)
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
        setCorrectCount((prev) => prev + 1);
  
        // Actualizar la categoría como "done"
        const updatedCategories = categories.map((cat) =>
          cat.name.toLowerCase() === hardQuestion.category.toLowerCase() ||
          cat.aliases.some((alias) => alias.toLowerCase() === hardQuestion.category.toLowerCase())
            ? { ...cat, done: true }
            : cat
        );
        setCategories(updatedCategories);        
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
            fetchHardAndUpdateCategory();
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
            <Timer />
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
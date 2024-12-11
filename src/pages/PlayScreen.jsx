import { useState, useEffect } from 'react'
import fetchQuestion from '../services/api/fetchdata';

// Función para barajar un array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function PlayScreen() {
  const [question, setQuestion] = useState('');

  useEffect(() => {
    const getQuestion = async () => {
      const quest = await fetchQuestion(30);
      if (quest) {
        setQuestion(quest[0]);
        console.log(quest)      
      }
    };
    getQuestion();   
  }, []);

  //Mostrar mensaje de cargando si no hay pregunta
  if (!question) {
    return <div>Cargando pregunta...</div>;
  }

  //Mezclar las correctas e incorrectas
  const answers = [
    question.correctAnswer,
    ...question.incorrectAnswers
  ];

  // Barajamos las respuestas
  const shuffledAnswers = shuffleArray(answers);

  return ( 
    <>
      <div className="areaFlex">
        <div className="questionDiv">
          <p>{question?.question?.text || 'Cargando pregunta...'}</p>
        </div>        
      </div>
      <div className="areaFlex">
      <ul className="optionList">
          {shuffledAnswers.map((answer, index) => (
            <li key={index} className="questionOption">
              {answer}
            </li>
          ))}
        </ul>
      </div>
    </>    
   );
}

export default PlayScreen;
import { useState, useEffect } from 'react';
const baseUrl = 'https://the-trivia-api.com/v2/questions'

function Borrar() {  
  const [ question, setQuestion ] = useState('')

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await fetch(`${baseUrl}?limit=1`)
      const quest = await response.json()

      setQuestion(quest[0])      
    }
    fetchQuestion()
  },[])

  console.log(question)
  return (
    <>
      <h1>Trivia Game</h1>      
      <p>{question?.question?.text || 'Cargando pregunta...'}</p>
    </>
  );
}

export default Borrar;
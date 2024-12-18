function Classification() {
  const finalTime = JSON.parse(localStorage.getItem('finalTime'));
  
  return ( 
    <div>
      <h2>Clasificaciones</h2>
      {finalTime && (
        <p>
          Tu tiempo: {String(finalTime.hours).padStart(2, '0')}:
          {String(finalTime.minutes).padStart(2, '0')}:
          {String(finalTime.seconds).padStart(2, '0')}
        </p>
      )}
    </div>
   );
}

export default Classification;
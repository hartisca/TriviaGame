function Count({aciertos, fallos}) {

  return ( 
    <>
      <div>
        <p>Right: </p>{aciertos}
        <p>Wrong: </p>{fallos}
      </div>      
    </>
   );
}

export default Count;
  
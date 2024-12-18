import useTimer from "../hooks/timer";
import { useEffect } from "react";

function Timer({ onTimeUpdate }) {
  
  const time = useTimer({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(time); //Llamamos a la función que pasamos como prop
    }
  }, [time, onTimeUpdate]); 

  return (     
    <p>
      {String(time.hours).padStart(2, '0')}:
      {String(time.minutes).padStart(2, '0')}:
      {String(time.seconds).padStart(2, '0')}
    </p>
   );

 }

export default Timer;
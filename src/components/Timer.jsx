import useTimer from "../hooks/timer";

function Timer() {
  
  const time = useTimer({hours: 0, minutes: 0, seconds: 0})
  return (     
    <p>
      {String(time.hours).padStart(2, '0')}:
      {String(time.minutes).padStart(2, '0')}:
      {String(time.seconds).padStart(2, '0')}
    </p>
   );

 }

export default Timer;
import { useState, useEffect } from 'react';

function useTimer(initialTime = { hours: 0, minutes: 0, seconds: 0 }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return time;
}

export default useTimer;

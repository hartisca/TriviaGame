import profileDefault from "../assets/usuario.png";
import { useState, useEffect } from "react";
import { fetchTopTimes } from "../utils/Auth";

function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return { hours, minutes, seconds: remainingSeconds };
}

function Classification() {
  const [ topTimes, setTopTimes ] = useState([])
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    const getTopTimes = async () => {
      try {
        setLoading(true);
        const times = await fetchTopTimes();
        setTopTimes(times);
      } catch (err) {
        setError('Error loading top times try again');
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    getTopTimes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return ( 
    <>
      <section className="classification">
        <h2>Best Timers</h2>      
        <table> 
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>User Name </th>
              <th>Time</th>            
            </tr>
          </thead>
          <tbody>
          {topTimes.map((entry, index) => {
              const { hours, minutes, seconds } = secondsToTime(entry.best_times);
              return (
                <tr key={index}>
                  <td><img src={entry.avatar_url ?? profileDefault} alt="Profile" className="imageTable" /></td>
                  <td>{entry.username}</td>
                  <td>
                    {String(hours).padStart(2, '0')}:
                    {String(minutes).padStart(2, '0')}:
                    {String(seconds).padStart(2, '0')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>    
  );
}

export default Classification;
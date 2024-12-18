import profileDefault from "../assets/usuario.png";

function Classification() {
  const finalTime = JSON.parse(localStorage.getItem('finalTime'));

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
          <tr>
            <td><img src={profileDefault} alt="" className="imageTable"/></td>
            <td>Driels</td>
            <td>{String(finalTime.hours).padStart(2, '0')}:
              {String(finalTime.minutes).padStart(2, '0')}:
              {String(finalTime.seconds).padStart(2, '0')}
            </td>
          </tr>   
          <tr>
            <td><img src={profileDefault} alt="" className="imageTable"/></td>
            <td>Alba</td>
            <td>{String(finalTime.hours).padStart(2, '0')}:
              {String(finalTime.minutes).padStart(2, '0')}:
              {String(finalTime.seconds).padStart(2, '0')}
            </td>
          </tr>    
          <tr>
            <td><img src={profileDefault} alt="" className="imageTable"/></td>
            <td>Pablo</td>
            <td>{String(finalTime.hours).padStart(2, '0')}:
              {String(finalTime.minutes).padStart(2, '0')}:
              {String(finalTime.seconds).padStart(2, '0')}
            </td>
          </tr> 
        </tbody>        
      </table>
    </section>      
    </>
    
   );
}

export default Classification;
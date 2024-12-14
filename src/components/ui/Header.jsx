import { useState } from "react";
import profileDefault from "../../assets/usuario.png";

function Header() {
  const menus = ["Profile", "Records", "Logout"]

  const [ open, setOpen ] = useState(false)

  return ( 
    <nav className="headerNav">
      <div className="titleContainer">
        <h1>Quizzbro</h1>
      </div>
      <div className="profileContainer">
        <img src={profileDefault} alt="Profile picture" 
        className="profilePicture"
        onClick={ () => setOpen(!open)} />
       {open&&(
         <div className="dropDownMenu">
          <ul>
            {menus.map((menu) => (
              <li key={menu}>{menu}</li>
            ))}
          </ul>
        </div>
       )}
      </div>      
    </nav>    
   );
}

export default Header;
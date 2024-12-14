import { useRef, useState, useEffect } from "react";
import profileDefault from "../../assets/usuario.png";

function Header() {
  const menus = ["Profile", "Records", "Logout"]

  const [ open, setOpen ] = useState(false)

  const menuRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(menuRef.current && imgRef.current) {
        if(
          !menuRef.current.contains(e.target) &&
          !imgRef.current.contains(e.target) 
        ) {
          setOpen(false)
        }
      }
    }
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, []);

  return ( 
    <nav className="headerNav">
      <div className="titleContainer">
        <h1>Quizzbro</h1>
      </div>
      <div className="profileContainer">
        <img src={profileDefault} alt="Profile picture" 
        className="profilePicture"
        ref={ imgRef }
        onClick={ () => setOpen(!open)} />
       {open&&(
         <div className="dropDownMenu">
          <ul>
            {menus.map((menu) => (
              <li key={menu}
              ref={ menuRef }
              onClick={ () => setOpen(false) }
              >{menu}</li>
            ))}
          </ul>
        </div>
       )}
      </div>      
    </nav>    
   );
}

export default Header;
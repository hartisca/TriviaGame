import { useState } from "react";

function Marks() {
  let categories = [ "Arts & Literature", "General Knowledge", "Geography", "History", "Science" ]
  let subcategories = [ "Film & TV", "Food & Drink", "Music", "Society & Culture", "Sport & Leisure"]

  const [ done, setDone ] = useState(false)

  return ( 
    <ul className="listaCategorias">
      {categories.map((categorie) => (
        <li key={categorie}>
          <strong>{categorie}</strong>: {done ? "Done!" : "Not done"}
        </li>
      ))}
    </ul>
   );
}

export default Marks;
function Marks({ categories }) {
  return (
    <ul className="listaCategorias">
      {categories.map((categorie) => (
        <li key={categorie.name} className={categorie.done ? "done" : "notDone"}>
          {categorie.name}
        </li>
      ))}
    </ul>
  );
}

export default Marks;
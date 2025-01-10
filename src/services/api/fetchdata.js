const baseUrl = 'https://the-trivia-api.com/v2/questions';

export const fetchQuestion = async (limit = 30) => {
  
  try {
    const response = await fetch(`${baseUrl}?difficulties=easy,medium&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};


export const fetchHardQuestion = async (categories) => {
  
  if (!categories || categories.length === 0) {
    throw new Error("Lista de categorías no disponible");
  }

  const randomIndex = Math.floor(Math.random() * categories.length);
  const selectedCategory = categories[randomIndex];
  
  try {
    const response = await fetch(`${baseUrl}?categories=${selectedCategory}&difficulties=hard&limit=1`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data)
    return { ...data, category: selectedCategory };
     // Incluye la categoría seleccionada
  } catch (error) {
    console.error("Error durante el fetch o procesamiento", error);
  }
};


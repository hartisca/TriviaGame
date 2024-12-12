const baseUrl = 'https://the-trivia-api.com/v2/questions';

const fetchQuestion = async (limit = 30) => {
  try {
    const response = await fetch(`${baseUrl}?limit=${limit}`);
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

export default fetchQuestion;

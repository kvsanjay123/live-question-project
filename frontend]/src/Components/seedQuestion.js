import axios from 'axios';

const fetchQuestions = async () => {
  try {
    const response = await axios.get('https://live-questions-project.onrender.com/api/questions');
    if (response.data) {
      console.log('Questions fetched successfully:', response.data);
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export default fetchQuestions;

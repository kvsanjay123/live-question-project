import React, { useEffect, useState } from "react";
import "../App.css"; // For additional CSS styles
import axios from "axios";

function SeedQuestion() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://live-question-project.onrender.com/api/questions"
        );
        setQuestions(response.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Unable to load questions. Please try again later.");
      }
    };

    fetchQuestions();
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="header">Extravagant Question List</h1>
      {questions.map((question, index) => (
        <div key={question._id} className="question-card">
          <h5>
            {index + 1}. {question.questionText}
          </h5>
          <ul>
            {question.options.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>
          <button
            className="show-answer-button"
            onClick={() => alert(`Correct Answer: ${question.correctAnswer}`)}
          >
            Show Answer
          </button>
        </div>
      ))}
    </div>
  );
}

export default SeedQuestion;

import React, { useEffect, useState } from "react";
import "../App.css"; // For additional CSS styles
import axios from "axios";

function SeedQuestion() {
  const [questions, setQuestions] = useState([]); // State to hold the questions
  const [error, setError] = useState(null); // State to handle errors

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://live-question-project.onrender.com/api/questions"
        );
        console.log("Fetched Questions:", response.data); // Log the API response
        setQuestions(response.data); // Set the questions in state
      } catch (err) {
        console.error("Error fetching questions:", err); // Log the error
        setError("Unable to load questions. Please try again later."); // Set error message
      }
    };

    fetchQuestions();
  }, []);

  // Log the questions state whenever it changes
  useEffect(() => {
    console.log("Questions State:", questions);
  }, [questions]);

  // If there is an error, display the error message
  if (error) {
    return (
      <div className="error-container">
        <h1>{error}</h1>
      </div>
    );
  }

  // If no questions are available, show a fallback message
  if (!questions || questions.length === 0) {
    return (
      <div className="container">
        <h1 className="header">Extravagant Question List</h1>
        <h3>No questions available</h3>
      </div>
    );
  }

  // Render the questions
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
          {/* Optional fields for explanation and difficulty */}
          {question.difficulty && (
            <p><strong>Difficulty:</strong> {question.difficulty}</p>
          )}
          {question.explanation && (
            <p><strong>Explanation:</strong> {question.explanation}</p>
          )}
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

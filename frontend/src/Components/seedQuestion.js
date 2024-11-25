import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const SeedQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Use environment variable for API URL
        const API_BASE_URL = process.env.REACT_APP_API_URL || "https://live-question-project.onrender.com";
        const response = await axios.get(`${API_BASE_URL}/api/questions`);
        setQuestions(response.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Unable to load questions. Please try again later.");
      } finally {
        setLoading(false); // Stop loading after API call
      }
    };
    fetchQuestions();
  }, []);

  // Loading state
  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  // Error state
  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="container">
      <h1 className="header">Telangana Group 3 Questions</h1>
      {questions.map((question, index) => (
        <div key={index} className="question-card">
          <h2>{question.question}</h2>
          <ol>
            {question.options.map((option, idx) => (
              <li key={idx}>{option}</li>
            ))}
          </ol>
          <button
            className="show-answer-button"
            onClick={() => alert(`Correct Answer: ${question.answer}`)}
          >
            Show Answer
          </button>
        </div>
      ))}
    </div>
  );
};

export default SeedQuestion;

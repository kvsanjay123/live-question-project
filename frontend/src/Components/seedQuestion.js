import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const SeedQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Use environment variable for API URL or fallback
        const API_BASE_URL = process.env.REACT_APP_API_URL || "https://live-question-project.onrender.com";
        const response = await axios.get(`${API_BASE_URL}/api/questions`);
        const data = response.data;

        // Validate response data
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Unable to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="container">
      <h1 className="header">Telangana Group 3 Questions</h1>
      {Array.isArray(questions) && questions.length > 0 ? (
        questions.map((question, index) => (
          <div key={index} className="question-card">
            <h2>{question.question}</h2>
            <ol>
              {Array.isArray(question.options) &&
                question.options.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
            </ol>
            <button
              className="show-answer-button"
              onClick={() => alert(`Correct Answer: ${question.answer}\nExplanation: ${question.explanation}`)}
            >
              Show Answer
            </button>
          </div>
        ))
      ) : (
        <div className="no-questions">No questions available to display.</div>
      )}
    </div>
  );
};

export default SeedQuestion;

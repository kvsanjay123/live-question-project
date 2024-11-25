import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SeedQuestion.css"; // Add CSS for styling

const SeedQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const API_BASE_URL =
          process.env.REACT_APP_API_URL || "https://live-question-project.onrender.com";

        const response = await axios.get(`${API_BASE_URL}/api/questions`);
        const data = response.data;

        if (Array.isArray(data)) {
          setQuestions(data);
        } else if (data.questions && Array.isArray(data.questions)) {
          setQuestions(data.questions);
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
    <div className="app-container">
      <h1 className="header">Telangana Group 3 Questions</h1>
      <div className="questions-container">
        {questions.map((question, index) => (
          <div key={index} className="question-card">
            <h2 className="question-text">{question.questionText}</h2>
            <div className="options-container">
              {question.options.map((option, idx) => (
                <button key={idx} className="option-button">
                  {option}
                </button>
              ))}
            </div>
            <button className="show-answer-button">Show Answer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeedQuestion;

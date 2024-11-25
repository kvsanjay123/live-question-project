import React, { useState, useEffect } from "react";
import axios from "axios";
import "./seedQuestion.css"; // Ensure this file path is correct

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

        // Validate response data
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
    <div className="container">
      <h1 className="header">Telangana Group 3 Questions</h1>
      <div className="questions-grid">
        {questions.map((question, index) => (
          <QuestionCard key={index} question={question} />
        ))}
      </div>
    </div>
  );
};

const QuestionCard = ({ question }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="question-card">
      <h3>{question.questionText}</h3>
      <div className="options">
        {question.options.map((option, index) => (
          <button key={index} className="option-btn">
            {option}
          </button>
        ))}
      </div>
      <button
        className="show-answer-btn"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
      {showAnswer && (
        <div className="answer-section">
          <p>
            <strong>Correct Answer:</strong> {question.correctAnswer}
          </p>
          {question.difficulty && (
            <p>
              <strong>Difficulty:</strong> {question.difficulty}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SeedQuestion;

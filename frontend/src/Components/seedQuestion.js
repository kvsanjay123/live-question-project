import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";


const SeedQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Use environment variable for API URL or fallback
        const API_BASE_URL =
          process.env.REACT_APP_API_URL || "https://live-question-project.onrender.com";

        const response = await axios.get(`${API_BASE_URL}/api/questions`);
        const data = response.data;

        // Validate response data
        if (Array.isArray(data)) {
          setQuestions(data); // Assuming `data` is an array of questions
        } else if (data.questions && Array.isArray(data.questions)) {
          setQuestions(data.questions); // Handle `questions` key in the response
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
      <ul className="question-list">
        {questions.map((question, index) => (
          <li key={index} className="question-item">
            {question.questionText}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeedQuestion;

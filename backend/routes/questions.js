const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Middleware to validate the data for POST requests
const validateQuestionData = (req, res, next) => {
    const { questionText, options, correctAnswer, explanation, difficulty } = req.body;

    if (!questionText || !options || !correctAnswer || !difficulty) {
        return res.status(400).json({
            error: "Missing required fields: questionText, options, correctAnswer, or difficulty",
        });
    }

    if (!Array.isArray(options) || options.length < 2) {
        return res.status(400).json({
            error: "Options must be an array with at least 2 items",
        });
    }

    next();
};

// Route to get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "Failed to fetch questions" });
    }
});

// Route to add a new question
router.post('/', validateQuestionData, async (req, res) => {
    const { questionText, options, correctAnswer, explanation, difficulty } = req.body;

    const newQuestion = new Question({
        questionText,
        options,
        correctAnswer,
        explanation,
        difficulty,
    });

    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        console.error("Error saving the question:", error);
        res.status(500).json({ error: "Failed to save the question" });
    }
});

module.exports = router;

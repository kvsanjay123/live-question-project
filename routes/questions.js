const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a question
router.post('/', async (req, res) => {
    const { questionText, options, correctAnswer, explanation, difficulty } = req.body;
    const question = new Question({
        questionText,
        options,
        correctAnswer,
        explanation,
        difficulty,
    });

    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

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

    const validDifficulties = ['Easy', 'Medium', 'Hard'];
    if (!validDifficulties.includes(difficulty)) {
        return res.status(400).json({
            error: `Invalid difficulty level. Valid options are: ${validDifficulties.join(', ')}`,
        });
    }

    next();
};

// Route to get all questions
router.get('/', async (req, res) => {
    const { page = 1, limit = 10, keyword } = req.query;

    try {
        // Create a search filter based on the keyword (if provided)
        const searchFilter = keyword
            ? { questionText: { $regex: keyword, $options: 'i' } } // Case-insensitive search
            : {};

        // Fetch questions with pagination and exclude the explanation field
        const questions = await Question.find(searchFilter, { explanation: 0 }) // Excludes explanation
            .limit(limit * 1) // Limit results per page
            .skip((page - 1) * limit) // Skip results based on the current page
            .exec();

        // Get the total number of matching questions for pagination metadata
        const totalQuestions = await Question.countDocuments(searchFilter);

        // Respond with questions and pagination metadata
        res.status(200).json({
            questions,
            totalPages: Math.ceil(totalQuestions / limit),
            currentPage: parseInt(page),
            totalQuestions,
        });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
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
        console.error('Error saving the question:', error);
        res.status(500).json({ error: 'Failed to save the question' });
    }
});

module.exports = router;

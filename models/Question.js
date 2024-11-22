const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema(
    {
        questionText : String,
        options : [String],
        correctAnswer : String,
        explanation:String,
        difficuilty : {
            type : String, enum:['Easy', 'medium','Hard']},
        });
    
module.exports = mongoose.model("Question", questionSchema);
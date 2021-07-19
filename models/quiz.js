const mongoose = require('mongoose')
const Schema = mongoose.Schema; // just some shortcut

const QuestionSchema = new Schema ({
    question: String,
    option1: String,
    option2: String,
    option3 : String,
    option4: String,
    answer: String
})

module.exports = mongoose.model('Question', QuestionSchema);
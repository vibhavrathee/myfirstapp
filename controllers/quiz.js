const Quiz = require('../models/quiz');
const Review = require('../models/review')

module.exports.index = async(req, res) => {
    // console.log(questions[0])//stupid choice
    const reviews = await Review.find({}).populate('author')
    const quiz = await Quiz.find({})//now quiz is storing all the questions
    res.render('home', { reviews })
}

module.exports.quiz1 = async(req, res) => {
    const quiz = await Quiz.find({});//all the question from mongoose are stored in quiz
    const index = 1, k = 0, total = 10;
    res.render('test', { quiz, index, k, total });
}

module.exports.quiz2 = async(req, res) => {
    const quiz = await Quiz.find({});//all the question from mongoose are stored in quiz
    const index = 2, k = 10, total = 5;
    res.render('test', { quiz, index, k, total });
}

module.exports.quiz3 = async(req, res) => {
    const quiz = await Quiz.find({});//all the question from mongoose are stored in quiz
    const index = 3, k = 15, total = 5;
    res.render('test', { quiz, index, k, total });
}

module.exports.quiz4 = async(req, res) => {
    // const question = new Quiz({ question: "Who won first world cup for india"});
    // await question.save();
    // res.send(question)
    const quiz = await Quiz.find({});//all the question from mongoose are stored in quiz
    // console.log(quiz)
    const index = 4, k = 20, total = 5;
    res.render('test', { quiz, index, k, total });
}

module.exports.postQuiz1 = async(req, res) => {
    const reviews = await Review.find({}).populate('author')//stores all reviews
    const selected = req.body.selected;//stores all selected options
    const quiz = await Quiz.find({});//stores all the questions with answers
    const k = 0, total = 10;
    res.render('final', {selected, quiz, reviews, k, total});
    // res.send("GOT IT");
}

module.exports.postQuiz2 = async(req, res) => {
    const reviews = await Review.find({}).populate('author')
    const selected = req.body.selected;
    const quiz = await Quiz.find({});
    const k = 10, total = 5;
    res.render('final', {selected, quiz, reviews, k, total});
}

module.exports.postQuiz3 = async(req, res) => {
    const reviews = await Review.find({}).populate('author')
    const selected = req.body.selected;
    const quiz = await Quiz.find({});
    const k = 15, total = 5;
    res.render('final', {selected, quiz, reviews, k, total});
}

module.exports.postQuiz4 = async(req, res) => {
    const reviews = await Review.find({}).populate('author')
    const selected = req.body.selected;
    const quiz = await Quiz.find({});
    const k = 20, total = 5;
    res.render('final', {selected, quiz, reviews, k, total});
}
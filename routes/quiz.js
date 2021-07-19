const express = require('express');
const router = express.Router({ mergeParams: true })

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

const { isLoggedIn } = require('../middleware')

const quiz = require('../controllers/quiz');

// router.get('/home', (req, res) => {
//     res.render('homePage')
// })
router.get('/', (req, res) => {
    res.render('homePage')
})

router.get('/home', catchAsync(quiz.index))

router.get('/quiz1', isLoggedIn, catchAsync(quiz.quiz1))

router.get('/quiz2',isLoggedIn, catchAsync(quiz.quiz2))

router.get('/quiz3',isLoggedIn, catchAsync(quiz.quiz3))

router.get('/quiz4',isLoggedIn, catchAsync(quiz.quiz4))

router.post('/quiz1',isLoggedIn, catchAsync(quiz.postQuiz1))

router.post('/quiz2',isLoggedIn, catchAsync(quiz.postQuiz2))

router.post('/quiz3',isLoggedIn, catchAsync(quiz.postQuiz3))

router.post('/quiz4',isLoggedIn, catchAsync(quiz.postQuiz4))

module.exports = router
const express = require('express');
const router = express.Router({ mergeParams: true })

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware')

const reviews = require('../controllers/review');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:id', isLoggedIn, isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports = router
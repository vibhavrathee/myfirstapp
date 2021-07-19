const { reviewSchema } = require('./schemas.js')
const Review = require('./models/review')
const ExpressError = require('./utils/ExpressError')//kinda like a data type of error

module.exports.validateReview = (req, res, next) => {
    //req.body.review
    //schemas wala schema hain ye mongo wala nahi 
    const { error } = reviewSchema.validate(req.body);
    if(error) {
        console.log(error.details)
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
        //result.error.details is an array
        //result.error.details.message contains message
    }
    else {
        next()
    }
}

module.exports.isLoggedIn = (req, res, next ) => {
    if(!req.isAuthenticated()) {//added by passport
        req.flash('error', 'You must be signed in')
        return res.redirect('/login')
    }
    else { next (); }
}

module.exports.isReviewAuthor = async(req, res, next) => {
    const id = req.params.id;//id of the review
    const review = await Review.findById(id)
    if(!review.author.equals(req.user._id)) {
        req.flash('error', "You don't have permission to delete this comment")
        return res.redirect('/')
    } else {
        next()
    }
}
const Review = require('../models/review')

module.exports.createReview = async(req, res) => {
    // res.send(req.body.review)
    const review = new Review(req.body.review)
    review.author = req.user._id
    await review.save();
    // res.send(review)
    req.flash('success', "Successfully created a review")
    res.redirect('/home')
}

module.exports.deleteReview = async(req, res) => {
    const id = req.params.id;//id of the review
    await Review.findByIdAndDelete(id);
    req.flash('success', "Successfully deleted a review")
    res.redirect('/home')
}
const Joi = require('joi');

const reviewSchema = Joi.object({
    //review is the key passed
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})
module.exports.reviewSchema = reviewSchema;
const Joi = require("joi");

const signUpDto = Joi.object({
    name: Joi.string().required().max(100),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

const signInDto = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

module.exports = {signUpDto, signInDto}
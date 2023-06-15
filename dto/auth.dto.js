const Joi = require("joi");

const authDto = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().min(3).required()
})

module.exports = {authDto}
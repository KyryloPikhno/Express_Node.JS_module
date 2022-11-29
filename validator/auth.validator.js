const regexp = require("../config/regexp.enum");
const Joi = require('joi')


module.exports ={
    loginValidator:Joi.object({
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim().required(),
        password:Joi.string().regex(regexp.PASSWORD).required(),
    })
}
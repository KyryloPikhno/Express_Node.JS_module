const Joi = require("joi");

const {MONGO_ID} = require("../config/regexp.enum");


module.exports = {
    IdValidator: Joi.string().regex(MONGO_ID)
};
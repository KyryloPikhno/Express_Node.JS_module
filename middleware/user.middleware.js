const ApiError = require("../error/ApiError");
const {userService} = require("../service");
const {userNormalizator} = require("../helper");
const userValidator = require('../validator/user.validator');
const commonValidator = require('../validator/common.validators')

module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.findOneByParams({_id: userId})

            if (!user) {
                throw new ApiError('Inna not found', 404);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {
                throw new ApiError('Email not present', 400);
            }

            const user = await userService.findOneByParams({email})

            if (user) {
                throw new ApiError('User with this email already exists', 409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isBodyValidCreate: (req, res, next) => {
        try {
            const {name, age, email} = req.body

            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new ApiError('wrong name', 400)
            }

            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new ApiError('wrong age', 400)
            }

            if (!email || !email.includes('@')) {
                throw new ApiError('wrong email', 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    isBodyValidUpdate: (req, res, next) => {
        try {
            const {name, age, email} = req.body

            if (name && (name.length < 2 || typeof name !== 'string')) {
                throw new ApiError('wrong name', 400)
            }

            if (age && (age < 18 || Number.isNaN(+age))) {
                throw new ApiError('wrong age', 400)
            }

            if (email || !email.includes('@')) {
                throw new ApiError('wrong email', 400)
            }

            next();
        } catch (e) {
            next(e)
        }
    },
    userNormalizator: (req, res, next) => {
        try {
            let {name, email} = req.body

            if (name) {
                req.body.name = userNormalizator.name(name)
            }
            if (email) {
                req.body.email = email.toLowerCase()
            }

            next();
        } catch (e) {
            next(e)
        }
    },
    isNewUserValid: async (req, res, next) => {
        try {
            const validate = userValidator.newUserValidator.validate(req.body)

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            req.body = validate.value

            next()
        } catch (e) {
            next(e)
        }
    },
    isUserIdValid: async (req, res, next) => {
        try {
            const {userId} = req.params

            const validate = commonValidator.IdValidator.validate(userId)

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    isEditUserValid: async (req, res, next) => {
        try {
            const validate = userValidator.editUserValidator.validate(req.body)

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            req.body = validate.value

            next()
        } catch (e) {
            next(e)
        }
    },
};
const ApiError = require("../error/ApiError");
const {fileServices} = require("../services");
const User = require('../dataBase/user')

module.exports = {
    checkIsUserExists: async (req, res, next) => {
        try {
            const {userId} = req.params

            const users = await User.find()

            const user = await User.find(userId)

            if (!user) {
                throw new ApiError('not found',404)
            }

            req.users = users

            req.user = user

            next();
        } catch (e) {
            next(e)
        }
    },
    isBodyValidCreate: (req, res, next) => {
        try {
            const {name, age} = req.body

            if (!name || name.length < 2 || typeof name !== 'string') {
                throw new ApiError('wrong name',400)
            }
            if (!age || age < 18 || Number.isNaN(+age)) {
                throw new ApiError('wrong age',400)
            }

            next();
        }catch (e) {
            next(e)
        }
    },
    isBodyValidUpdate:  (req, res, next) => {
        try {
            const {name, age} = req.body

            if (name && (name.length < 2 || typeof name !== 'string')) {
                throw new ApiError('wrong name',400)
            }
            if (age && (age < 18 || Number.isNaN(+age))) {
                throw new ApiError('wrong age',400)
            }

            next();
        }catch (e) {
            next(e)
        }
    },
    isIdValid:  (req, res, next) => {
        try {
            const {userId} = req.params

            if (userId < 0 || Number.isNaN(+userId)) {
                throw new ApiError('not valid id',400)
            }

            next();
        }catch (e) {
            next(e)
        }
    },
    checkIsEmailUnique: async (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email) {
                throw new ApiError('Email not present', 400);
            }

            const user = await User.findOne({ email });

            if (user) {
                throw new ApiError('User with this email already exists', 409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
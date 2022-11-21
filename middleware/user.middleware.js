const {fileServices} = require("../services");


module.exports = {
    checkIsUserExists: async (req, res, next) => {
        try {
            const {userId} = req.params

            const users = await fileServices.reader()

            const user = users.find(user => user.id === +userId)

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
    isBodyValidCreate: async (req, res, next) => {
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
    isBodyValidUpdate: async (req, res, next) => {
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
    isIdValid: async (req, res, next) => {
        try {
            const {userId} = req.params

            if (userId < 0 || Number.isNaN(+userId)) {
                throw new ApiError('not valid id',400)
            }

            next();
        }catch (e) {
            next(e)
        }
    }
};
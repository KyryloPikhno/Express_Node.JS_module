const {fileServices} = require("../services");


module.exports = {
    checkIsUserExists: async (req, res, next) => {
        try {
            const {userId} = req.params

            const users = await fileServices.reader()

            const user = users.find(user => user.id === +userId)

            if (!user) {

            }

            req.user = user

            next();
        } catch (e) {
            next(e)
        }
    },
    isBodyValid: async (req, res, next) => {
        try {
            const {name, age} = req.body

            if (name.length < 2 || typeof name !== 'string') {
                return res.status(400).json('Wrong name')
            }
            if (age < 18 || Number.isNaN(+age)) {
                return res.status(400).json('Wrong age')
            }

            next();
        }catch (e) {
            next(e)
        }
    }
};
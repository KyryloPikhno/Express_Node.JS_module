const {fileServices} = require("../services");


module.exports = {
    checkIsUserExists: async (req, res, next) => {
        const {userId} = req.params

        const users = await fileServices.reader()

        const user = users.find(user => user.id === +userId)

        if (!user) {
            throw new Error('User Not found')
        }

        req.user = user

        next();
    }
};
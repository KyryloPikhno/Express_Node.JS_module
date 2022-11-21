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
        }catch (e) {
            next(e)
        }
    }
};
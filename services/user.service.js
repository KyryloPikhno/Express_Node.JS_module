const User = require("../dataBase/User");

module.exports = {
    find: async (filter) => {
        return User.find(filter)
    }
}
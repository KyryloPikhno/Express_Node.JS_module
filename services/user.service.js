const User = require("../dataBase/User");


module.exports = {
    findByParams: async (filter) => {
        return User.find(filter)
    },
    updateOne: async (filter) =>{
        return User.findByIdAndUpdate(filter)
    }
}
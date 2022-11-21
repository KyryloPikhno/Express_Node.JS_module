const {fileServices} = require("../services");


module.exports = {
    getAllUsers: async (req, res,next) => {
        try {
            const users = await fileServices.reader()

            res.json(users)
        }catch (e) {
            next(e)
        }
    },
    getUserById: async (req, res,next) => {
        try{
            res.json(req.user)
        }catch (e){
            next(e)
        }
    },
    deleteUser: async (req, res) => {
        const {userId} = req.params

        const users = await fileServices.reader()

        const index = users.findIndex(user => user.id === +userId);

        if (index === -1) {
            return res.status(404).json(`User ${userId} not found`)
        }

        users.splice(index, 1)

        await fileServices.writer(users)

        res.sendStatus(204)
    },
    postUser: async (req, res) => {
        const userInfo = req.body

        const users = await fileServices.reader()

        const newUser = {
            name: userInfo.name,
            age: userInfo.age,
            id: users[users.length - 1].id + 1
        };

        users.push(newUser);

        await fileServices.writer(users)

        res.status(201).json(newUser)
    },
    updateUser: async (req, res) => {
        const newUserInfo = req.body

        const {userId} = req.params

        const users = await fileServices.reader()

        const index = users.findIndex(user => user.id === +userId);

        if (index === -1) {
            return res.status(404).json(`User ${userId} not found`)
        }

        users[index] = {...users[index], ...newUserInfo}

        await fileServices.writer(users)

        res.status(201).json(users[index])
    }
};
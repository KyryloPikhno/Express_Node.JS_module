const {fileServices} = require("../services");
const User = require('../dataBase/user')


module.exports = {
    getAllUsers: async (req, res,next) => {
        try {
            const users = await User.find()

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
    deleteUser: async (req, res,next) => {
        try {
            await User.deleteOne({_id: req.params.userId})

            res.sendStatus(204)
        }catch (e){
            next(e)
        }
    },
    postUser: async (req, res, next) => {
        try {
            await User.create(req.body)

            res.json('created')
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {user, users, body} = req

            const index = users.findIndex((u) => u.id === user.id)

            users[index] = {...users[index], ...body}

            await fileServices.writer(users)

            res.status(201).json(users[index])

        } catch (e) {
            next(e)
        }

    }
};
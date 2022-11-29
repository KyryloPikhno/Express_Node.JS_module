const authMdlwr = require('../middleware/auth.middleware')
const userMdlwr = require('../middleware/user.middleware')

const router = require('express').Router();
const {authController} = require('../controller')


router.post(
    '/auth',
    authMdlwr.isBodyValid,
    userMdlwr.getUserDynamically('email'),
    authController.login
)

module.exports = router
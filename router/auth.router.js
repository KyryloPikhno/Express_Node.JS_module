const router = require('express').Router();
const {authController} = require('../controller')


router.post('/auth', authController.login)

module.exports = router
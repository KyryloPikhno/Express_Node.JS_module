const router = require('express').Router();
const controller = require('../controller/user.controller');
const middleware = require('../middleware/user.middleware')


router.get('/', controller.getAllUsers);

router.get('/:userId',middleware.checkIsUserExists, controller.getUserById);

router.post('/', controller.postUser);

router.put('/:userId',middleware.checkIsUserExists, controller.updateUser);

router.delete('/:userId',middleware.checkIsUserExists, controller.deleteUser);


module.exports = router;
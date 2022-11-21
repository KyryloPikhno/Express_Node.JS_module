const router = require('express').Router();
const controller = require('../controller/user.controller');
const middleware = require('../middleware/user.middleware')


router.get('/', controller.getAllUsers);

router.post('/',middleware.isBodyValid, controller.postUser);

router.get('/:userId',middleware.checkIsUserExists, controller.getUserById);

router.put('/:userId', controller.updateUser);

router.delete('/:userId', controller.deleteUser);


module.exports = router;
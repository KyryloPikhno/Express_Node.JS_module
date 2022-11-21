const router = require('express').Router();
const controller = require('../controller/user.controller');


router.get('/', controller.getAllUsers);

router.get('/:id', controller.getUserById);

router.post('/', controller.postUser);

router.put('/:userId', controller.updateUser);

router.delete('/:userId', controller.deleteUser);


module.exports = router;
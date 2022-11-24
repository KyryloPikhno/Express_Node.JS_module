const router = require('express').Router();
const controller = require('../controller/user.controller');
const middleware = require('../middleware/user.middleware')

router.get(
    '/',
    controller.getAllUsers
);

router.post(
    '/',
    middleware.checkIsEmailUnique,
    controller.postUser
);

router.get(
    '/:userId',
    middleware.isIdValid,
    middleware.checkIsUserExists,
    controller.getUserById
);

router.put(
    '/:userId',
    middleware.isIdValid,
    middleware.isBodyValidUpdate,
    middleware.checkIsUserExists,
    controller.updateUser
);

router.delete(
    '/:userId',
    middleware.isIdValid,
    middleware.checkIsUserExists,
    controller.deleteUser
);


module.exports = router;
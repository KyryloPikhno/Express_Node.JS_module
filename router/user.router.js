const {userController} = require("../controller");
const router = require('express').Router();
const mdlwr = require("../middleware/user.middleware");

router.get('/', userController.getAllUsers);
router.post('/',mdlwr.isNewUserValid, mdlwr.isBodyValidCreate ,mdlwr.userNormalizator , mdlwr.checkIsEmailUnique, userController.createUser);

router.get('/:userId',mdlwr.isUserIdValid, mdlwr.checkIsUserExist, userController.getUserById);
router.put('/:userId' ,mdlwr.isUserIdValid,mdlwr.isEditUserValid,mdlwr.isBodyValidUpdate ,mdlwr.userNormalizator, mdlwr.checkIsUserExist, userController.updateUser);
router.delete('/:userId',mdlwr.isUserIdValid, userController.deleteUserById);

module.exports = router;
const { Router } = require("express");
const userController = require('../controllers/userControllers.js');
const router = Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);

module.exports = router;

const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.get('/getUsers', userController.getAllUser);
router.get('/getUser', userController.getUser);
router.post('/create/user', userController.createUser);
router.post('/update/user', userController.updateUser);
router.post('/delete/user', userController.deleteUser);

module.exports = router;

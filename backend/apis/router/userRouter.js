const express = require('express')
const  userWorker = require('../controller/userController')

const router = express.Router();

router.post('/signup', userWorker.createUser);
router.post('/resetpwd', userWorker.updatePassword);
router.get('/find', userWorker.findUser);
router.post('/deleteusr', userWorker.deletePassword);

module.exports = router
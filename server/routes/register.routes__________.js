const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.controller');

router.post('/', usersCtrl.createUser);

module.exports = router;
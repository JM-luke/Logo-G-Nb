const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/login.controller');

router.post('/', loginCtrl.loginUser);

module.exports = router;
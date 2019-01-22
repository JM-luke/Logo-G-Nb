const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

router.post('/signin', authCtrl.signin);
router.post('/signup', authCtrl.signup);
router.delete('/signout', authCtrl.signout);
router.post('/forgot', authCtrl.forgot);
//router.post('/resetpass/:token', authCtrl.reset);

module.exports = router;
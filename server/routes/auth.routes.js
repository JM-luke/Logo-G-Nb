const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

router.post('/signin', authCtrl.signin);
router.post('/signup', authCtrl.signup);
router.delete('/signout', authCtrl.signout);
// Setting up the users password api
router.post('/forgot', authCtrl.forgot);

router.get('/reset-password', authCtrl.validateResetToken);
router.post('/reset', authCtrl.reset);
router.post('/reset-pass', authCtrl.resetPass);

module.exports = router;
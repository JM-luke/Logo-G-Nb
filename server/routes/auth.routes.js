const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

router.post('/signin', authCtrl.signin);
router.post('/signup', authCtrl.signup);
router.delete('/signout', authCtrl.signout);
// Setting up the users password api
router.post('/forgot', authCtrl.forgot);

router.get('/reset/:token', authCtrl.validateResetToken);
router.post('/reset/:token', authCtrl.reset);

module.exports = router;
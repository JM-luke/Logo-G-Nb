const express = require('express');
const router = express.Router();
const correoCtrl = require('../controllers/correo.controller');
var guard = require('express-jwt-permissions')();
const role = require('../models/role');

router.get('/', correoCtrl.getAuthUrl);
router.get('/mail', correoCtrl.getCorreos);
router.post('/mail', guard.check(role.Admin), correoCtrl.createCorreo);
router.get('/mail:id', guard.check(role.Admin), correoCtrl.getCorreo);
router.put('/mail:id', guard.check(role.Admin), correoCtrl.editCorreo);
router.delete('/mail:id', guard.check(role.Admin), correoCtrl.deleteCorreo);
router.get('/authorize', correoCtrl.authorize);

module.exports = router;

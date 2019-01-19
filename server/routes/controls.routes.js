const express = require('express');
const router = express.Router();
const controlsCtrl = require('../controllers/controls.controller');
var guard = require('express-jwt-permissions')();
const role = require('../models/role');

router.get('/', guard.check(role.Admin), controlsCtrl.getControls);
router.post('/', guard.check(role.Admin), controlsCtrl.createControl);
router.get('/:id', guard.check(role.Admin), controlsCtrl.getControl);
router.put('/:id', guard.check(role.Admin), controlsCtrl.editControl);
router.delete('/:id', guard.check(role.Admin), controlsCtrl.deleteControl);

module.exports = router;

const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.controller');
var guard = require('express-jwt-permissions')();
const role = require('../models/role');

router.get('/', guard.check(role.Admin), usersCtrl.getUsers);
router.post('/', guard.check(role.Admin), usersCtrl.createUser);
router.get('/:id', guard.check(role.Admin), usersCtrl.getUser);
router.put('/:id', usersCtrl.editUser);
router.delete('/:id', guard.check(role.Admin), usersCtrl.deleteUser);

module.exports = router;
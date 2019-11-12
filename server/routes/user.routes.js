const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.controller');
var guard = require('express-jwt-permissions')();
const role = require('../models/role');

router.get('/', guard.check(role.admin),usersCtrl.getUsers);
router.post('/', guard.check(role.admin), usersCtrl.createUser);
router.get('/:id', guard.check(role.admin), usersCtrl.getUser);
router.put('/:id', guard.check(role.admin), usersCtrl.editUser);
router.delete('/:id', guard.check(role.admin), usersCtrl.deleteUser);

module.exports = router;
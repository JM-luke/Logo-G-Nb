const express = require('express');
const router = express.Router();
const dataLogo = require('../dataLogo');
var guard = require('express-jwt-permissions')();
const role = require('../models/role');

router.get('/', guard.check([[role.admin],[role.controller]]), (req, res) => {
    res.json(dataLogo.logoPositions);
});

module.exports = router;
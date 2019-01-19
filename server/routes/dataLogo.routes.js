const express = require('express');
const router = express.Router();
const dataLogo = require('../dataLogo');
var guard = require('express-jwt-permissions')();
const role = require('../models/role');

router.get('/', guard.check([[role.Admin],[role.Controller]]), (req, res) => {
    res.json(dataLogo.logoPositions);
});

module.exports = router;
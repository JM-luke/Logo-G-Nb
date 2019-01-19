const loginService = require('../services/login.service');

module.exports = {
  loginUser : loginUser
};

function loginUser(req, res, next) {
  loginService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect.' }))
    .catch(err => next(err));
}



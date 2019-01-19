const authService = require('../services/auth.service');

module.exports = {
  signin : signin
};

function signin(req, res, next) {
   console.log('Login');
    
  authService.signin(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect.' }))
    .catch(err => next(err));
}

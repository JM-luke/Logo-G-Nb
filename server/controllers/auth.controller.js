const authService = require('../services/auth.service');

module.exports = {
  signin : signin,
  signup : signup,
  signout : signout,
  forgot : forgot,
  //reset : reset
};

function signin(req, res, next) {
  authService.signin(req.body)
  .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect.' }))
  .catch(err => next(err));
}

function signup(req, res, next){
  authService.signup(req.body)
    .then((data) => res.json(data))
    .catch(err => next(err));
}

function signout(req, res, next){
  //res.json({});
  authService.signout()
    .then(() => res.json({}))
    .catch(err => next(err));
}

function forgot(req, res, next){
  authService.forgot()
    .then(() => res.json({}))
    .catch(err => next(err));
}
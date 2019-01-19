const userService = require('../services/user.service');

const usersCtrl = {};

usersCtrl.getUsers = (req, res, next) => {
  userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
};

usersCtrl.getUser = (req, res, next) => {
  userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
};

usersCtrl.createUser = (req, res, next) => {
  userService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

usersCtrl.deleteUser = (req, res, next) => {
  userService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
};

usersCtrl.editUser = (req, res, next) => {  
  userService.update(req.params.id, req.user.sub, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

module.exports = usersCtrl;
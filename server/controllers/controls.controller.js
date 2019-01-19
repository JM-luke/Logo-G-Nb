const controlService = require('../services/control.service');

const controlsCtrl = {};

  controlsCtrl.getControls = (req, res, next) => {
    controlService.getAll()
      .then(users => res.json(users))
      .catch(err => next(err));
  };
  
  controlsCtrl.getControl = (req, res, next) => {
    controlService.getById(req.params.id)
      .then(user => user ? res.json(user) : res.sendStatus(404))
      .catch(err => next(err));
  };
  
  controlsCtrl.createControl = (req, res, next) => {
    controlService.create(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
  }
  
  controlsCtrl.deleteControl = (req, res, next) => {
    controlService.delete(req.params.id)
      .then(() => res.json({}))
      .catch(err => next(err));
  };
  
  controlsCtrl.editControl = (req, res, next) => {  
    controlService.update(req.params.id, req.user.sub, req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
  }

module.exports = controlsCtrl;
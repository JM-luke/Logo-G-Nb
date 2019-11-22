const correoService = require('../services/correo.service');

const correoCtrl = {};

  correoCtrl.getAuthUrl = (req,res, next) => {
    correoService.getAuthUrl(req, res)
      .then(params => res.json(params))
      .catch(err => next(err));
  };

  correoCtrl.authorize = (req,res, next) => {
    correoService.authorize(req, res,next)
      .then()
      .catch(err => next(err));
  }
  correoCtrl.getCorreos = (req, res, next) => {
    correoService.getAll(req)
      .then(correos => res.json(correos))
      .catch(err => next(err));
  };
  
  correoCtrl.getCorreo = (req, res, next) => {
    correoService.getById(req.params.id)
      .then(correo => correo ? res.json(correo) : res.sendStatus(404))
      .catch(err => next(err));
  };
  
  correoCtrl.createCorreo = (req, res, next) => {
    correoService.create(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
  }
  
  correoCtrl.deleteCorreo = (req, res, next) => {
    correoService.delete(req.params.id)
      .then(() => res.json({}))
      .catch(err => next(err));
  };
  
  correoCtrl.editCorreo = (req, res, next) => {  
    correoService.update(req.params.id, req.user.sub, req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
  }

module.exports = correoCtrl;
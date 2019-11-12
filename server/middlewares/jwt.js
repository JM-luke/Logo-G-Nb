const expressJwt = require('express-jwt');
const config = require('../config.json');
const userService = require('../services/user.service');

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    // public routes that don't require authentication
    path: new RegExp(/\/api\/auth\/((?!reset)|(reset.+))/)
    //path: new RegExp(/\/api\/auth\/.*/)
  });
} 

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }
  done();
};
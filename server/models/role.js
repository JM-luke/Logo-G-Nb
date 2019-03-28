const config = require('../config.json');
const Role =  config.roles || {"admin": "admin"};
module.exports = Role;

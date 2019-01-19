const config = require('../config.json');
const Role =  config.roles || {"Admin": "Admin"};
module.exports = Role;

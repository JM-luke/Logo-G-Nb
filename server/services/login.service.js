const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const config = require('../config.json');

module.exports = {
  authenticate
}

async function authenticate({ email, password }) {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    // delete password from user Object
    const { password, ...userWithoutPassword } = user.toObject();
    const payload = {
      sub: user.id,
      name: user.name,
      // surmname: user.surmname,
      // email: user.email,
      permissions: [user.role]
    }
    const token = jwt.sign(payload, config.secret, { expiresIn: '24h' });
    return {
      ...userWithoutPassword,
      token
    };
  }
}

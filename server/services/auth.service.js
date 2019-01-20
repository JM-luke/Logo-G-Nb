const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const config = require('../config.json');

module.exports = {
  signin,
  signup,
  signout
}

async function signin({ email, password }) {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    // delete password from user Object
    const { password, ...userWithoutPassword } = user.toObject();
    const payload = {
      sub: user.id,
      fullName: user.fullName,
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

async function signup(userParam) {

  console.log(userParam);
  const user = new User(userParam);
  if(!user.password  || userParam.password !== userParam.confirmPassword){ throw 'Invalid password' }
  // validate
  if(!user.fullName || !user.email){
    throw 'incomplete data'; 
  }
  if (await User.findOne({ email: user.email })) {
    throw 'Email "' + userParam.email + '" is already taken';
  }
  // hash password
  user.password = bcrypt.hashSync(user.password, 10); 
  // save user
  await user.save();
  // send token
  const payload = {
    sub: user.id,
    fullName: user.fullName,
    permissions: [user.role]
  }
  const token = jwt.sign(payload, config.secret, { expiresIn: '24h' });
  const data = { token: token };
  return data;
}

async function signout(){
  console.log('Signout');
  return {}; 
}
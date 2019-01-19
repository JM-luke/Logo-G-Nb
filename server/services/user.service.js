const User = require('../models/user.model');
const bcrypt = require('bcryptjs');



module.exports = {

  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await User.find().select('-password');
}

async function getById(id) {
  return await User.findById(id).select('-password');
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}

async function create(userParam) {
  //userParam.Password = {pwd: null, comfirmPwd: null} or {pwd: string, confirmPwd: string}
  userParam.password = userParam.password.pwd;
  const user = new User(userParam);
  // validate
  if(!user.name || !user.surname || !user.email || !user.password ){
    throw 'incomplete data'; 
  }
  if (await User.findOne({ email: user.email })) {
    throw 'Email "' + userParam.email + '" is already taken';
  }
  // hash password
  user.password = bcrypt.hashSync(user.password, 10); 
  // save user
  await user.save();
}

async function update(id, sub, userParam){
  
  if(id !== sub) throw 'User not authorized!';
  const user = await User.findById(id);
  // validate
  if (!user) throw 'User not found';
  // if we are updating email and this email already exists
  if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
      throw 'Username "' + userParam.username + '" is already taken';
  }
  //userParam.Password = {pwd: null, comfirmPwd: null} or {pwd: string, confirmPwd: string}
  const pass = userParam.password.pwd;
  delete userParam.password;
  // hash password if it was entered
  if (pass !== null){
    userParam.password = bcrypt.hashSync(pass, 10);
  }
  await User.findOneAndUpdate({"_id":id},{$set:userParam});
}
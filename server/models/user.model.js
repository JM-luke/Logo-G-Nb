const mongoose = require('mongoose');
const Role = require('./role');
const { Schema } = mongoose;
const UserSchema = new Schema ({

    name: { type: String, required: true },
    surname: { type: String, required: true }, 
    email: { type: String, unique: true, required: true },
    emailGroups: { type: [String], required: false },
    role: { type: String, required: true, default: Role.User },
    password: { type: String, required: true },
    //hash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', UserSchema);
 
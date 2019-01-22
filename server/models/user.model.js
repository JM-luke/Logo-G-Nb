const mongoose = require('mongoose');
const Role = require('./role');
const { Schema } = mongoose;

/**
 * A Validation function for username
 * - at least 3 characters
 * - only a-z0-9_-.
 * - contain at least one alphanumeric character
 * - not in list of illegal usernames
 * - no consecutive dots: "." ok, ".." nope
 * - not begin or end with "."
 */

var validateUsername = function (username) {
    var usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
    return (
      this.provider !== 'local' ||
      (username && usernameRegex.test(username) && config.illegalUsernames.indexOf(username) < 0)
    );
  };


const UserSchema = new Schema ({

    
    fullName: { 
      type: String, 
      required: true,
      validate: [validateUsername, 'Please enter a valid username: 3+ characters long, non restricted word, characters "_-.", no consecutive dots, does not begin or end with dots, letters a-z and numbers 0-9.'], 
    }, 
    email: { 
      type: String,
      unique: 'Email already exists', 
      required: 'Please fill a valid email address', 
      lowercase: true,
      trim: true,
    },
    emailGroups: { type: [String] },
    
    roles: {
      type: [{
        type: String,
        enum: ['user', 'admin']
      }],
      required: 'Please provide at least one role',
      default: [Role.User]
    },
    profileImageURL: {
      type: String,
      //default: 'modules/users/client/img/profile/default.png'
    },
    updated: {
      type: Date
    },
    password: { type: String, unique: true, required: 'Please fill in your password' },
    //hash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    /* For reset password */
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpires: {
      type: Date
    }

});

module.exports = mongoose.model('User', UserSchema);
 
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const config = require('../config.json');
const nodemailer = require('nodemailer');

module.exports = {
  signin,
  signup,
  signout,
  forgot,
  reset,
  validateResetToken,
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
  return {}; 
}

async function forgot(userParams){
  const email = userParams.body.email || '';
  const user = await User.findOne({ email });
  
  if(!user){ throw `Email ${email} invalid` }
  const payload = {
    sub: user.id,
    email: user.email,
  }
  const secret = user.password+'-'+user.createdDate.getTime();
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();
  const baseUrl = config.domain || 'http://' + userParams.headers.host;
  const emailHTML = 
    ` <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title></title>
      </head>
      <body>
        <p>Dear ${user.fullName},</p>
        <br />
        <p>
        You have requested to have your password reset for your account at ${config.app.name}
        </p>
        <p>Please visit this url to reset your password:</p>
        <p>${baseUrl + '/#/auth/reset-password/?reset_password_token=' + token}</p>
        <br />
        <p>${'http://localhost:4200/#/auth/reset-password/?reset_password_token='+ token}</p>
        <p>the link expires in one hour.</p>
        <strong>If you didn't make this request, you can ignore this email.</strong> <!--###-->
        <br />
        <br />
        <p>The ${config.app.name} Support Team</p>
      </body>
    </html>`;
  var mailOptions = {
    to: user.email,
    from: config.mailer.from,
    subject: 'Password Reset',
    html: emailHTML
  };
  const transporter = nodemailer.createTransport(config.mailer.options);
  await transporter.sendMail(mailOptions)
    .then((info) => console.log(`Email sent: ${info.response}`))
    .catch((err) => {
      //console.log(err);
      throw err;
    });

}
  

async function validateResetToken(req, res){
//   const user = await User.findOne({ 
//     resetPasswordToken: req.params.token,
//     resetPasswordExpires: {
//       $gt: Date.now()
//     }
//   });
//   if(!user){ 
//     //throw `Password reset is invalid`
//     return res.redirect('/password/reset/invalid');
//   }
//   res.redirect('/reset-password/'+ req.params.token);
}

async function reset(req, res){
  
  const user = await User.findOne({ 
    resetPasswordToken: req.body.reset_password_token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  });

  if(!user){ 
    throw `Token reset is invalid`;
  }
  if(req.body.password && req.body.password === req.body.confirmPassword){
    // hash password
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  }
}



/*
var smtpTransport = nodemailer.createTransport(config.mailer.options);
*/

/**
 * Forgot for reset password (forgot POST)
 */
/*
exports.forgot = function (req, res, next) {
  async.waterfall([
    // Generate random token
    function (done) {
      crypto.randomBytes(20, function (err, buffer) {
        var token = buffer.toString('hex');
        done(err, token);
      });
    },
    // Lookup user by username
    function (token, done) {
      if (req.body.usernameOrEmail) {

        var usernameOrEmail = String(req.body.usernameOrEmail).toLowerCase();

        User.findOne({
          $or: [
            { username: usernameOrEmail },
            { email: usernameOrEmail }
          ]
        }, '-salt -password', function (err, user) {
          if (err || !user) {
            return res.status(400).send({
              message: 'No account with that username or email has been found'
            });
          } else if (user.provider !== 'local') {
            return res.status(400).send({
              message: 'It seems like you signed up using your ' + user.provider + ' account, please sign in using that provider.'
            });
          } else {
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function (err) {
              done(err, token, user);
            });
          }
        });
      } else {
        return res.status(422).send({
          message: 'Username/email field must not be blank'
        });
      }
    },
    function (token, user, done) {

      var httpTransport = 'http://';
      if (config.secure && config.secure.ssl === true) {
        httpTransport = 'https://';
      }
      var baseUrl = config.domain || httpTransport + req.headers.host;
      res.render(path.resolve('modules/users/server/templates/reset-password-email'), {
        name: user.displayName,
        appName: config.app.title,
        url: baseUrl + '/api/auth/reset/' + token
      }, function (err, emailHTML) {
        done(err, emailHTML, user);
      });
    },
    // If valid email, send reset email using service
    function (emailHTML, user, done) {
      var mailOptions = {
        to: user.email,
        from: config.mailer.from,
        subject: 'Password Reset',
        html: emailHTML
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        if (!err) {
          res.send({
            message: 'An email has been sent to the provided email with further instructions.'
          });
        } else {
          return res.status(400).send({
            message: 'Failure sending email'
          });
        }

        done(err);
      });
    }
  ], function (err) {
    if (err) {
      return next(err);
    }
  });
};

/**
 * Reset password GET from email token
 */
/*
exports.validateResetToken = function (req, res) {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }, function (err, user) {
    if (err || !user) {
      return res.redirect('/password/reset/invalid');
    }

    res.redirect('/password/reset/' + req.params.token);
  });
};
*/
/**
 * Reset password POST from email token
 */
/*
exports.reset = function (req, res, next) {
  // Init Variables
  var passwordDetails = req.body;

  async.waterfall([

    function (done) {
      User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          $gt: Date.now()
        }
      }, function (err, user) {
        if (!err && user) {
          if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
            user.password = passwordDetails.newPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function (err) {
              if (err) {
                return res.status(422).send({
                  message: errorHandler.getErrorMessage(err)
                });
              } else {
                req.login(user, function (err) {
                  if (err) {
                    res.status(400).send(err);
                  } else {
                    // Remove sensitive data before return authenticated user
                    user.password = undefined;
                    user.salt = undefined;

                    res.json(user);

                    done(err, user);
                  }
                });
              }
            });
          } else {
            return res.status(422).send({
              message: 'Passwords do not match'
            });
          }
        } else {
          return res.status(400).send({
            message: 'Password reset token is invalid or has expired.'
          });
        }
      });
    },
    function (user, done) {
      res.render('modules/users/server/templates/reset-password-confirm-email', {
        name: user.displayName,
        appName: config.app.title
      }, function (err, emailHTML) {
        done(err, emailHTML, user);
      });
    },
    // If valid email, send reset email using service
    function (emailHTML, user, done) {
      var mailOptions = {
        to: user.email,
        from: config.mailer.from,
        subject: 'Your password has been changed',
        html: emailHTML
      };

      smtpTransport.sendMail(mailOptions, function (err) {
        done(err, 'done');
      });
    }
  ], function (err) {
    if (err) {
      return next(err);
    }
  });
};
*/
/**
 * Change Password
 */
/*
exports.changePassword = function (req, res, next) {
  // Init Variables
  var passwordDetails = req.body;

  if (req.user) {
    if (passwordDetails.newPassword) {
      User.findById(req.user.id, function (err, user) {
        if (!err && user) {
          if (user.authenticate(passwordDetails.currentPassword)) {
            if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
              user.password = passwordDetails.newPassword;

              user.save(function (err) {
                if (err) {
                  return res.status(422).send({
                    message: errorHandler.getErrorMessage(err)
                  });
                } else {
                  req.login(user, function (err) {
                    if (err) {
                      res.status(400).send(err);
                    } else {
                      res.send({
                        message: 'Password changed successfully'
                      });
                    }
                  });
                }
              });
            } else {
              res.status(422).send({
                message: 'Passwords do not match'
              });
            }
          } else {
            res.status(422).send({
              message: 'Current password is incorrect'
            });
          }
        } else {
          res.status(400).send({
            message: 'User is not found'
          });
        }
      });
    } else {
      res.status(422).send({
        message: 'Please provide a new password'
      });
    }
  } else {
    res.status(401).send({
      message: 'User is not signed in'
    });
  }
};


*/
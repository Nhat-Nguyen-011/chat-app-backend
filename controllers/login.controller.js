const User = require('../models/user.model');

// const loginUser = (user, done) => {
//   const loginUser = new User();
//   loginUser.email = user.emailHandle;
//   loginUser.password = user.password;

//   //need to change to validation functions
//   //get all the data that is need then pass it to the front main props
//   // loginUser.save((err, data) => {
//   //   if (err) return done(err);
//   //   done(null, data);
//   // });
// };

const done = (...args) => {
  let [err, data] = args;
  if (err != null) return console.log(err);
  return data;
};

const findOneByEmail = async function (email, done) {
  return await User.findOne({ email: email }, { _id: 1, password: 1 }, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

const findOneByHandle = async function (handle, done) {
  return await User.findOne({ handle: handle }, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

const checkValidForm = async (user) => {
  const checkPassword = (password, user) => {
    return password == user.password ? user : 'Password is incorrect';
  };

  let response = true;
  if (!user.emailHandle) {
    response = 'Please type in your email or account handle';
  } else if (!user.password) {
    response = 'Please fill out your password';
  } else {
    if (/@/.test(user.emailHandle)) {
      const userObj = await findOneByEmail(user.emailHandle, done);
      if (!userObj) {
        response = 'Email does not exist';
      } else {
        response = checkPassword(user.password, userObj);
      }
    } else {
      const userObj = await findOneByHandle(user.emailHandle, done);
      if (!userObj) {
        response = 'Account does not exist';
      } else {
        response = checkPassword(user.password, userObj);
      }
    }
  }
  return response;
};

const controller = async (req, res) => {
  const response = await checkValidForm(req.body);
  if (typeof response != 'object') return res.json({ message: response });
  res.json({ message: response });
};

module.exports = controller;

const User = require('../models/user.model');

const createNewUser = (user, done) => {
  const newUser = new User();
  newUser.email = user.email;
  newUser.password = user.password;
  newUser.handle = user.handle;
  newUser.name = user.name;

  newUser.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const done = (...args) => {
  let [err, data] = args;
  if (err != null) return console.log(err);
  return data;
};

const findOneByEmail = async function (email, done) {
  return await User.findOne({ email: email }, { _id: 1 }, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

const findOneByHandle = async function (handle, done) {
  return await User.findOne({ handle: handle }, { _id: 1 }, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

const checkValidForm = async (user) => {
  let response = true;
  if (!user.email) {
    response = 'Please fill out your email';
  } else if (!user.password) {
    response = 'Please fill out your password';
  } else if (!user.confirmPassword) {
    response = 'Please confirm your password';
  } else if (!user.handle) {
    response = 'Please choose your unique handle';
  } else if (!user.name) {
    response = 'Please choose your display name';
  } else if (user.password != user.confirmPassword) {
    response = 'Passwords does not match';
  } else if (await findOneByEmail(user.email, done)) {
    response = 'This email is already registed';
  } else if (await findOneByHandle(user.handle, done)) {
    response = 'This handle is already taken';
  }

  return response;
};

const controller = async (req, res) => {
  const response = await checkValidForm(req.body);
  if (response != true) return res.json({ message: response });
  // createNewUser(req.body, done);
  console.log(`This user was created ${req.body}`);
  res.json({ message: true });
};

module.exports = controller;

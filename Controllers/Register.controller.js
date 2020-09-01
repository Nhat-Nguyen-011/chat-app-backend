const FormChecker = require('./ServerWorker/FormChecker');

const Register = async (req, res) => {
  const package = req.body;
  if (!package.checkValid && !package.register) res.json({ error: 'Invalid request' });
  let response = {};

  if (package.checkValid) {
    switch (package.checkValid[0]) {
      case 'email':
        response = await FormChecker.checkExistedEmail(package.checkValid[1]);
        break;
      case 'password':
        response = FormChecker.checkValidPassword(package.checkValid[1]);
        break;
      case 'handle':
        response = await FormChecker.checkExistedHandle(package.checkValid[1]);
        break;
      case 'name':
        response = FormChecker.checkValidName(package.checkValid[1]);
        break;
      default:
        response = { error: 'Invalid request' };
    }
  } else if (package.register) {
    if (
      !package.register.email ||
      !package.register.password ||
      !package.register.handle ||
      !package.register.name
    ) {
      response = { error: 'Please check your form for missing field' };
    } else {
      response = await FormChecker.checkValidRegisterForm(package.register);
    }
  }
  res.json(response);
};

module.exports = Register;

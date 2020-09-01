const UserModel = require('../../Models/User.model');

class FormChecker {
  static checkValidEmail(email) {
    const reformEmail = String(email).toLowerCase();
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(reformEmail) ? reformEmail : { error: 'Invalid email format' };
  }

  static async checkExistedEmail(email) {
    const reformEmail = this.checkValidEmail(email);
    if (reformEmail.error) return reformEmail;
    if (
      (await UserModel.findOneByEmail(reformEmail)) ||
      (await UserModel.findOneTempByEmail(reformEmail))
    ) {
      return { error: 'This email already existed' };
    }
    return reformEmail;
  }

  static checkValidPassword(password) {
    // Between  8-25, atleat 1 num 1 upper 1 lower and allow !@#$%^&*
    const reformPassword = String(password);
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,25}$/;
    return re.test(reformPassword)
      ? reformPassword
      : {
          error:
            'Invalid password format, password should be between 8 and 25 characters, atleast 1 uppercase, 1 lowercase and 1 number . may contain [!@#$%^&*]',
        };
  }

  static checkValidHandle(handle) {
    // Only lowercase and number no space 7-25
    const reformHandle = String(handle);
    const re = /^[0-9A-Za-z]{7,25}$/;
    return re.test(reformHandle)
      ? reformHandle
      : {
          error:
            'Invalid handle format, handle should be between 7 and 25 lowercase characters and or numbers',
        };
  }

  static async checkExistedHandle(handle) {
    const reformHandle = this.checkValidHandle(handle);
    if (reformHandle.error) return reformHandle;
    if (
      (await UserModel.findOneByHandle(reformHandle)) ||
      (await UserModel.findOneTempByHandle(reformHandle))
    ) {
      return { error: 'This handle already existed' };
    }
    return reformHandle;
  }

  static checkValidName(name) {
    // Only lower uper number space between 6 and 30
    const reformName = String(name).trim().replace(/\s+/g, ' ');
    const re = /^[0-9A-Za-z ]{6,30}$/;
    return re.test(reformName)
      ? reformName
      : {
          error:
            'Invalid name format, name should be between 6 and 30 characters and may contain letters, space, and or numbers',
        };
  }

  static async checkValidRegisterForm(form) {
    const responses = {
      email: await this.checkExistedEmail(form.email),
      password: this.checkValidPassword(form.password),
      handle: await this.checkExistedHandle(form.handle),
      name: this.checkValidName(form.name),
    };

    for (const key in responses) {
      if (responses[key].error) return { error: 'Please check your form for error' };
    }

    return await UserModel.createNewUser(responses);
  }
}

module.exports = FormChecker;

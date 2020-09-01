const nodeMailer = require('nodemailer');

class NodeMailer {
  static createTransporter() {
    return nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });
  }

  static async sendConfirmRegister(user) {
    const transporter = this.createTransporter();
    const confirmEmail = {
      from: process.env.email,
      to: user.email,
      subject:
        'DO NOT REPLY - Please confirm your account for Chat App on nguyennhat.work',
      html: `<div>Hello ${user.name},
      Please click the link below to complete your registeration for chat app on nguyennhat.work. This link will expired after 3 days.</div>
      <div><a href='https://www.google.com'>click here to confirm your account</a></div><br />
      <div><h3>If this is not you,</h3> please click the link below to cancel the registeration.</div>
      <div><a href='https://www.google.com'>click here to cancel the registeration</a></div>`,
    };
    try {
      await transporter.sendMail(confirmEmail);
      return 'Successfully registered';
    } catch (error) {
      console.error(error);
      return { error: 'Server error. Please contact support for further investigation' };
    }
  }
}

module.exports = NodeMailer;

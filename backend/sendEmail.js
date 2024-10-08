const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rgbeatz01@gmail.com",
    pass: "lwxelcdpcqmwkixu",
  },
});

const sendVerificationToken = (email, token) => {
  const mailOptions = {
    from: "rgbeatz01@gmail.com",
    to: email,
    subject: "Your Verification Token",
    text: `Your verification token is ${token}. It will expire in 5 minutes`,
  };
  return transporter.sendMail(mailOptions);
};

const generateToken = () => {
  let token = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 11; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return token;
};

module.exports = { sendVerificationToken, generateToken };

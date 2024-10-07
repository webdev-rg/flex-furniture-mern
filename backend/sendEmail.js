const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rgbeatz01@gmail.com",
    pass: "lwxelcdpcqmwkixu",
  },
});

const sendOTP = (email, otp) => {
  const mailOptions = {
    from: "rgbeatz01@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your otp code is ${otp}. It will expire in 10 minutes`,
  };
  return transporter.sendMail(mailOptions);
};

const generateOTP = () => {
  let randomChars = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 11; i++) {
    randomChars += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return randomChars;
};

module.exports = { sendOTP, generateOTP };

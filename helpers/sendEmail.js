const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, META_EMAIL } = process.env;

const nodeMailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodeMailerConfig);

const sendEmail = async (email) => {
  try {
    await transport.sendMail(email);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;

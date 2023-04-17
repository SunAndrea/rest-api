const createError = require("../helpers/createError");
const sendEmail = require("../helpers/sendEmail");
const User = require("../models/contacts/users.model");
const { usersService } = require("../services/index");

const { META_EMAIL, BASE_URL } = process.env;

const register = async (req, res, next) => {
  try {
    const user = await usersService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const result = await usersService.login(req.body);
  res.status(201).json(result);
};

const logout = async (req, res, next) => {
  await usersService.logout(req.user.id);
  res.status(204).send();
};

const verifyEmail = async (req, res, next) => {
  const { verificationCode } = req.params;

  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw createError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });
  res.status(200).json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404, "User not found");
  }
  if (user.verify) {
    throw createError(401, "Verification has already been passed");
  }

  const verifyEmail = {
    from: META_EMAIL,
    to: user.email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}"> Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: "Verification email sent" });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  resendVerifyEmail,
};

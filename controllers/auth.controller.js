const createError = require("../helpers/createError");
const User = require("../models/contacts/users.model");
const { usersService } = require("../services/index");

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

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
};

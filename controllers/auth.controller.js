// const { createError } = require("../helpers/createError");

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

module.exports = {
  register,
  login,
  logout,
};

// const { createError } = require("../helpers/createError");

const usersService = require("../services/users.service");

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

module.exports = {
  register,
  login,
};

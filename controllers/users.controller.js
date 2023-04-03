const { usersService } = require("../services/index");

const findAll = async (req, res, next) => {
  const users = await usersService.findAll();
  res.status(200).json(users);
};

const findCurrentUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const updateUserStatus = async (req, res, next) => {
  const id = req.user._id;
  const user = await usersService.updateById(id, req.body);
  res.status(200).json(user);
};

module.exports = {
  findAll,
  findCurrentUser,
  updateUserStatus,
};

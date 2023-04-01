const { usersService } = require("../services/index");

const findAll = async (req, res, next) => {
  const users = await usersService.findAll();
  res.status(200).json(users);
};

module.exports = {
  findAll,
};

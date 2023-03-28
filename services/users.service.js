const { hashString, compareHashes } = require("../helpers/bcrypt");
const createError = require("../helpers/createError");
const User = require("../models/contacts/users.model");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const register = async (user) => {
  try {
    const existingUser = await findByEmail(user.email);
    if (existingUser) {
      throw createError(409, "User already registered");
    }

    const passwordHash = await hashString(user.password);
    const dbUser = (
      await User.create({ ...user, password: passwordHash })
    ).toObject();

    const { password, ...newUser } = dbUser;
    return newUser;
  } catch (error) {
    throw createError(error.status ?? 400, error.message);
  }
};

const login = async ({ email, password }) => {
  const existingUser = await findByEmail(email);
  if (
    !existingUser ||
    !(await compareHashes(password, existingUser.password))
  ) {
    throw createError(401, "Email and/or password do not match");
  }
  return {
    token: "sfnsdjhfjhsd",
  };
};

module.exports = {
  register,
  login,
};

const { hashString, compareHashes } = require("../helpers/bcrypt");
const createError = require("../helpers/createError");
const { sign } = require("../helpers/jwt");
const User = require("../models/contacts/users.model");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findAll = async () => {
  return await User.find();
};

const findById = async (id) => {
  console.log(id);
  return await User.findById(id);
};

const updateById = async (id, updatedUser) => {
  // return
  await User.findByIdAndUpdate(id, updatedUser);
};

const saveToken = async (id, token) => {
  return await updateById(id, { token });
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
    console.log(dbUser);

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
  const id = existingUser._id;

  const payload = {
    id,
  };

  const token = sign(payload);
  await saveToken(id, token);
  return { token };
};

const logout = async (id) => {
  const existingUser = await findById(id);
  // console.log(existingUser);
  if (!existingUser) {
    throw createError(404, "User not found");
  }

  await updateById(id, { token: null });
};

module.exports = {
  register,
  login,
  findAll,
  updateById,
  saveToken,
  logout,
  findById,
};

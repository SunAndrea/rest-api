const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { usersService } = require("../services/index");

const findAll = async (req, res, next) => {
  const users = await usersService.findAll();
  res.status(200).json(users);
};

const findCurrentUser = async (req, res, next) => {
  const {
    _doc: { password, token, ...currentUser },
  } = req.user;

  res.status(200).json(currentUser);
};

const updateUserStatus = async (req, res, next) => {
  const id = req.user._id;
  const user = await usersService.updateById(id, req.body);
  res.status(200).json(user);
};

const updateUserAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  try {
    Jimp.read(tempUpload)
      .then((photo) => {
        return photo.resize(250, 250).write(resultUpload);
      })
      .catch((err) => {
        console.error(err);
      });

    const resultUpload = path.join(
      __dirname,
      "../",

      "public",
      "avatars",
      `${id}_${originalname}`
    );

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", `${id}_${originalname}`);
    await usersService.updateById(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};

module.exports = {
  findAll,
  findCurrentUser,
  updateUserStatus,
  updateUserAvatar,
};

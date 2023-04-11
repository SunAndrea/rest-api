require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs/promises");
const {
  contactsRouter,
  authRouter,
  userRouter,
} = require("./routes/api/index");
const errorFilter = require("./middlewares/errorFilter.middleware");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// const tempDir = path.join(__dirname, "temp");
// const avatarDir = path.join(__dirname, "public", "avatars");
// console.log(`avatarDir`, avatarDir);
// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tempDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: {
//     fileSize: 2048,
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

// const avatars = [];

// app.post("/api/users/avatars", upload.single("image"), async (req, res) => {
//   const { path: tempUpload, originalname } = req.file;
//   const resultUpload = path.join(avatarDir, originalname);
//   try {
//     await fs.rename(tempUpload, resultUpload);
//     const image = path.join("public", "avatars", originalname);
//     const newAvatar = {
//       name: req.body.name,
//       image,
//     };
//     avatars.push(newAvatar);
//     res.status(201).json(newAvatar);
//   } catch (error) {
//     await fs.unlink(tempUpload);
//   }
// });

// app.get("/api/users/avatars", async (req, res) => {
//   res.status(200).json(avatars);
// });

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

app.use(errorFilter);

module.exports = app;

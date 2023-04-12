require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

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

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

app.use(errorFilter);

module.exports = app;

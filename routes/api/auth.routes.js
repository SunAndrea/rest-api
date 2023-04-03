const express = require("express");
const { createValidator } = require("express-joi-validation");
const controllerWrapper = require("../../helpers/controllerWrapper");
const {
  register,
  login,
  logout,
} = require("../../controllers/auth.controller");
const { registerSchema, loginSchema } = require("../../schemas/auth.schema");
const authorizeMiddleware = require("../../middlewares/authorize.middleware");

const router = express.Router();
const validator = createValidator();

router.post(
  "/register",
  validator.body(registerSchema),
  controllerWrapper(register)
);

router.post("/login", validator.body(loginSchema), controllerWrapper(login));

router.get("/logout", authorizeMiddleware, controllerWrapper(logout));

module.exports = router;

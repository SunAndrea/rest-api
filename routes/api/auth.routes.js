const express = require("express");
const { createValidator } = require("express-joi-validation");
const controllerWrapper = require("../../helpers/controllerWrapper");
const {
  register,
  login,
  logout,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth.controller");
const {
  registerSchema,
  loginSchema,
  emailSchema,
} = require("../../schemas/auth.schema");
const authorizeMiddleware = require("../../middlewares/authorize.middleware");

const router = express.Router();
const validator = createValidator();

router.post(
  "/register",
  validator.body(registerSchema),
  controllerWrapper(register)
);
router.get("/verify/:verificationCode", controllerWrapper(verifyEmail));
router.post(
  "/verify",
  validator.body(emailSchema),
  controllerWrapper(resendVerifyEmail)
);
router.post("/login", validator.body(loginSchema), controllerWrapper(login));

router.get("/logout", authorizeMiddleware, controllerWrapper(logout));

module.exports = router;

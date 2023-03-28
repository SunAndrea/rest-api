const express = require("express");
const { createValidator } = require("express-joi-validation");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { register, login } = require("../../controllers/auth.controllers");
const { registerSchema, loginSchema } = require("../../schemas/auth.schema");

const router = express.Router();
const validator = createValidator();

router.post(
  "/register",
  validator.body(registerSchema),
  controllerWrapper(register)
);

router.post("/login", validator.body(loginSchema), controllerWrapper(login));

module.exports = router;

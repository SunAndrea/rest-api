const express = require("express");
const {
  findAll,
  findCurrentUser,
  updateUserStatus,
} = require("../../controllers/users.controller");
const controllerWrapper = require("../../helpers/controllerWrapper");
const authorizeMiddleware = require("../../middlewares/authorize.middleware");
const validationMiddleware = require("../../middlewares/validation.middlewares");
const { userUpdateSchema } = require("../../schemas/user.schema");

const router = express.Router();

router.get("/", authorizeMiddleware, controllerWrapper(findAll));
router.get("/current", authorizeMiddleware, controllerWrapper(findCurrentUser));
router.patch(
  "/",
  authorizeMiddleware,
  validationMiddleware(userUpdateSchema),
  controllerWrapper(updateUserStatus)
);
module.exports = router;

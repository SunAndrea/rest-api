const express = require("express");
const { findAll } = require("../../controllers/users.controller");
const controllerWrapper = require("../../helpers/controllerWrapper");
const authorizeMiddleware = require("../../middlewares/authorize.middleware");

const router = express.Router();

router.get("/", authorizeMiddleware, controllerWrapper(findAll));

module.exports = router;

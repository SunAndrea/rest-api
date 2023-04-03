const express = require("express");
const router = express.Router();
const controllerWrapper = require("../../helpers/controllerWrapper");
const {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/contacts.controller");

const {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateStatusSchema,
} = require("../../schemas/contacts.schema");
const validationMiddleware = require("../../middlewares/validation.middlewares");
const authorizeMiddleware = require("../../middlewares/authorize.middleware");

router.get("/", authorizeMiddleware, controllerWrapper(getListContacts));

router.get("/:id", controllerWrapper(getContactById));

router.delete("/:id", controllerWrapper(removeContact));

router.post(
  "/",
  authorizeMiddleware,
  validationMiddleware(contactAddSchema),
  controllerWrapper(addContact)
);

router.put(
  "/:id",
  validationMiddleware(contactUpdateSchema),
  controllerWrapper(updateContactById)
);

router.patch(
  "/:id/favorite",
  validationMiddleware(contactUpdateStatusSchema),
  controllerWrapper(updateStatusContact)
);

module.exports = router;

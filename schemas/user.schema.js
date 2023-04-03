const joi = require("joi");

const userUpdateSchema = joi.object({
  subscription: joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  userUpdateSchema,
};

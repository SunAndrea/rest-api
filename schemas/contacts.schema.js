const joi = require("joi");

const contactAddSchema = joi
  .object({
    name: joi.string().required().min(1),
    email: joi.string().required().min(1).email({ minDomainSegments: 2 }),
    phone: joi.string().required().min(1),
    favorite: joi.bool().optional(),
  })
  .messages({
    "any.required": ` missing required {{#label}} field`,
    "string.empty": `{{#label}} cannot have an empty value`,
    "string.email": `not valid email`,
  });

const contactUpdateSchema = joi
  .object({
    name: joi.string().optional().trim(true),
    email: joi.string().optional().trim(true),
    phone: joi.string().optional().trim(true),
  })
  .or("name", "email", "phone")
  .required();
// .messages({
//   "string.required": ` missing  field`,
// });

const contactUpdateStatusSchema = joi
  .object({
    favorite: joi.boolean().required(),
  })
  .messages({
    "any.required": `missing field favorite`,
    "boolean.base": `favorite must be a boolean value`,
  });

module.exports = {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateStatusSchema,
};

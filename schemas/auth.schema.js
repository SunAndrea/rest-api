const joi = require("joi");

const registerSchema = joi.object({
  email: joi.string().required().email({ minDomainSegments: 2 }),
  password: joi.string().required(),
});

const loginSchema = joi.object({
  email: joi.string().required().email({ minDomainSegments: 2 }),
  password: joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};

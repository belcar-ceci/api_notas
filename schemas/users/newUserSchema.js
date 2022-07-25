const Joi = require("joi");
const { generateError } = require("../../helpers");

const newUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(4)
    .max(50)
    .required()
    .error(
      generateError(
        "😮 Email is required. Must be a valid one and must have between 4 and 100 characters",
        400
      )
    ),
  password: Joi.string()
    .min(4)
    .max(100)
    .required()
    .error(
      generateError(
        "😮  Password is required and must have between 4 and 100 characters",
        400
      )
    ),
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(generateError(
      "😮 Name must have between 3 and 100 characters",
      400
    )
    ),
});

module.exports = newUserSchema;

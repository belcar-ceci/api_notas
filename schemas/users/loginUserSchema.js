const Joi = require("joi");
const { generateError } = require("../../helpers");

const loginUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(generateError("Email is required and must be a valid one", 400)),
  password: Joi.string()
    .min(4)
    .required()
    .error(
      generateError(
        "Password is required and must have between 4 and 100 characters",
        400
      )
    ),
});

module.exports = loginUserSchema;

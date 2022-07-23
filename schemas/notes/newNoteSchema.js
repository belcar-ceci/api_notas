const Joi = require("joi");
const { generateError } = require("../../helpers");

const newNoteSchema = Joi.object({
  title: Joi.string()
    .min(4)
    .max(100)
    .required()
    .error(
      generateError(
        "Title is required and must have between 4 and 100 characters",
        400
      )
    ),
  description: Joi.string()
    .min(4)
    .max(500)
    .required()
    .error(
      generateError(
        "Text is required and must have between 4 and 500 characters",
        400
      )
  ),
  category: Joi.string()

    .required()
    .error(
      generateError(
        "Text is required and must have between 4 and 500 characters",
        400
      )
    ),
});

module.exports = newNoteSchema;

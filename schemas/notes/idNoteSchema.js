const Joi = require("joi");
const { generateError } = require("../../helpers");

const idNoteSchema = Joi.number()
  .required()
  .error(generateError("Note id is required and must be a number", 404));

module.exports = idNoteSchema;

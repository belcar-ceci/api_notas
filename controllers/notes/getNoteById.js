const { selectNoteById } = require("../../repositories/notes");
const { generateError } = require("../../helpers");
const { idNoteSchema } = require("../../schemas/notes");

const getNoteById = async (req, res, next) => {
  try {
    const { idNote } = req.params;

    await idNoteSchema.validateAsync(idNote);

    const noteDB = await selectNoteById(idNote);

    if (!noteDB) {
      generateError("Note does not exist", 404);
    }

    const userId = req.auth.id;

    if (noteDB.user_id !== userId) {
      generateError("You cant get someone else's note", 400); //solo puede ver la nota  el propio usuario
    }
    res.status(200).send({ status: "ok", data: noteDB });
  } catch (error) {
    next(error);
  }
};

module.exports = getNoteById;
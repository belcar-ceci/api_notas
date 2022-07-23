const { selectNoteById, updateNoteById } = require("../../repositories/notes");
const { generateError } = require("../../helpers");
const {idNoteSchema } = require("../../schemas/notes");

const editNote = async (req, res, next) => {
  try {
    const { idNote } = req.params;

    await idNoteSchema.validateAsync(idNote);
    
    const noteDB = await selectNoteById(idNote);

    if (!noteDB) {
      generateError("Note does not exist", 404);
    }

    const userId = req.auth.id;

    if (noteDB.user_id !== userId) {
      generateError("You cant update someone else's note", 400); 
    } //The user edits his own note

    await updateNoteById({ ...noteDB, ...req.body });
    //I make a copy of the notes from the database and overwrite them with the data from the body

    res.status(200).send({ status: "ok 🚀 ", message: "Note updated 🔖 " });

  } catch (error) {
    next(error);
  }
};

module.exports = editNote;
const { selectNoteById, updateNoteById } = require("../../repositories/notes");

const editNote = async (req, res, next) => {
  try {
    const { idNote } = req.params;

    const noteDB = await selectNoteById(idNote);

    if (!noteDB) {
      const error = new Error("Note does not exist")
      error.statusCode = 404;
      throw error;
    }

    const userId = req.auth.id;

    if (noteDB.user_id !== userId) {
      const error = new Error("You cant update someone else's note")
      error.statusCode = 404;
      throw error;
    } //The user edits his own note

    await updateNoteById({ ...noteDB, ...req.body });
    //I make a copy of the notes from the database and overwrite them with the data from the body

    res.status(200).send({ status: "ok 🚀 ", message: "Note updated 🔖 " });

  } catch (error) {
    next(error);
  }
};

module.exports = editNote;
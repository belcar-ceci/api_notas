const { selectNotes } = require("../../repositories/notes");
const { generateError } = require("../../helpers");

const getNotes = async (req, res, next) => {
  try {
    const userId = req.auth.id;

    const notes = await selectNotes(userId);

    if (notes.length === 0) {
      throw generateError("User doesn't have notes", 404);
    }

    res.status(200).send({ status: "ok", data: notes });
  } catch (error) {
    next(error);
  }
};

module.exports = getNotes;
const getPool = require("../../database/getPool");

const selectNotes = async (userId) => {
  const pool = getPool();

  const [notes] = await pool.query(
    "SELECT title FROM notes WHERE user_id = ? ",
    [userId]
  );

  return notes;
};

module.exports = selectNotes;

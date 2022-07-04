const getPool = require("../../database/getPool");

const updateNoteById = async ({ title, description, category, id }) => {
  const pool = getPool();

  const [{ affectedRows }] = await pool.query(
    "UPDATE notes SET title = ?, description = ?, category = ? , WHERE id = ?",
    [title, description, category, id] //id note
  );

  return affectedRows;
};

module.exports = updateNoteById;

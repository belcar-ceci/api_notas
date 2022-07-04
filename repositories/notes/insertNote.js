const getPool = require("../../database/getPool");

const insertNote = async ({
  title,
  description,
  category,
  userId,
}) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO notes (title, description, category,  user_id) VALUES (?, ?, ?, ?)",
    [title, description, category, userId]
  );

  return insertId;
};

module.exports = insertNote;

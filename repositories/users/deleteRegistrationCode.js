const getPool = require("../../database/getPool");

const deleteRegistrationCode = async (userId) => {
  const pool = getPool();

  const [{ changeInRow }] = await pool.query(
    "UPDATE users SET registrationCode = NULL WHERE id = ?",
    [userId]
  );

  return changeInRow;
};

module.exports = deleteRegistrationCode;
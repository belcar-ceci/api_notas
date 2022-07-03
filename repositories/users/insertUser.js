const getPool = require("../../database/getPool");

const insertUser = async ({
    email,
    encryptedPassword,
    name,
    registrationCode
  
}) => {
  const pool = getPool();
  //new user
  const [{ insertId }] = await pool.query(
    "INSERT INTO users (email, password, name, registrationCode) VALUES (?, ?, ?, ?)",
    [email, encryptedPassword, name, registrationCode] //user with register code
  );
  //return id user
  return insertId;
};

module.exports = insertUser;
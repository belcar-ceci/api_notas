require("dotenv").config();
const bcrypt = require("bcrypt");
const getPool = require("./getPool");

const populateDB = async () => {
  try {
    const pool = getPool();

    console.log("Inserting data in users...");

    await pool.query(
      `INSERT INTO users (email, password, name) VALUES 
      ("ceci@email.com", ?, "ceci");`,
      [await bcrypt.hash("123456", 10)]
    );

    await pool.query(
      `INSERT INTO notes (title, description, category, user_id) VALUES
      ("Cocina Mediterranea", "Ingredientes","Cocina", 1);`
    );

    console.log("¡All done!");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

populateDB();
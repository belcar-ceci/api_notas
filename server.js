require("dotenv").config();
const express = require("express");

const { SERVER_PORT } = process.env;

const { validateAuth } = require("./middlewares");

//controllers user
const {
    registerUser,
    activateUser,
    loginUser
} = require("./controllers/users"); //Coge el index por defecto

//controllers notes
const { createNote, editNote } = require("./controllers/notes");

const app = express();

app.use(express.json()); //peticiones

//Enpoints User
app.post("/users", registerUser);
app.put("/users/activate/:registrationCode", activateUser); //cambio el put por el get(pequeña trampa para q lleque activar al correo)
app.post("/login", loginUser);

//Enpoints Notes
app.post("/notes", validateAuth, createNote);
app.patch("/notes/:idNote", validateAuth, editNote);

/** Middleware 404 */ //rutas que no se encuentran
app.use((req, res, next) => {
    res.status(404).send({status: "error", message: "Not Found"})
});

/** Middleware error */
app.use((error, req, res, next) => {
    console.error(error)

    res.statusCode = error.statusCode || 500;
    res.send({ status: "error", message: error.message });
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening 👌 on http://localhost:${SERVER_PORT}`);
});
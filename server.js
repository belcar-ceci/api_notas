require("dotenv").config();
const cors = require("cors");
const express = require("express");

const { SERVER_PORT } = process.env;

const { validateAuth, notFound, handleError } = require("./middlewares");

//controllers user
const {
    registerUser,
    activateUser,
    loginUser
} = require("./controllers/users"); //Coge el index por defecto

//controllers notes
const { getNotes, getNoteById, createNote, editNote } = require("./controllers/notes");

const app = express();

app.use(express.json()); //peticiones
app.use(cors()); //Middleware de cors para poder hacer peticiones desde fuera


//Enpoints User
app.post("/users", registerUser);
app.put("/users/activate/:registrationCode", activateUser); //cambio el put por el get(pequeña trampa para q lleque activar al correo)
app.post("/login", loginUser);

//Enpoints Notes
/**
 
app.get("/notes/:idNote", checkPublic, validateAuth, getNoteById);
 */
app.get("/notes", validateAuth, getNotes);//Todas las notas
app.get("/notes/:idNote", validateAuth, getNoteById);//Una nota
app.post("/notes", validateAuth, createNote);
app.patch("/notes/:idNote", validateAuth, editNote);

/** Middleware 404 */ //lost routes
app.use(notFound)

/** Middleware error */
app.use(handleError)

app.listen(SERVER_PORT, () => {
  console.log(`Server listening 👌 on http://localhost:${SERVER_PORT}`);
});
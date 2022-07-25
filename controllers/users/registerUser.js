const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { insertUser, selectUserByEmail } = require("../../repositories/users");
const { generateError } = require("../../helpers");
const { sendMail } = require("../../helpers");
const { newUserSchema } = require("../../schemas/users");

const registerUser = async (req, res, next) => {
    try {
        await newUserSchema.validateAsync(req.body);

        const { email, password, name } = req.body;

        const userWithSameEmail = await selectUserByEmail(email);

        if (userWithSameEmail) {
             throw generateError("Already exists an user with that email", 400)
         }
        
        const encryptedPassword = await bcrypt.hash(password, 10);

        const registrationCode = uuidv4(); //generate id that activates user, eliminates registration code.
        
        const insertId = await insertUser({
            email,
            encryptedPassword,
            name,
            registrationCode
        });

        const { SERVER_HOST, SERVER_PORT } = process.env;
    //Envío el mail:(con el subjet,content,recipient)
        await sendMail(
        "¡Welcome to Notes!",
        `
        <p>Activate your account here:</p>
        <a href="http://${SERVER_HOST}:${SERVER_PORT}/users/activate/${registrationCode}">Activate</a>
        `,
        email
        );
        //Send email with registrationCode
        res.status(201).send({
            status: "ok 🚀 ",
            data: { id: insertId }
        });
    } catch (error) {
        next(error)
    }
};

module.exports = registerUser;
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { insertUser, selectUserByEmail } = require("../../repositories/users");
const { generateError } = require("../../helpers");

const registerUser = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        const userWithSameEmail = await selectUserByEmail(email);

        if (userWithSameEmail) {
             generateError("Already exists an user with that email", 400)
         }
        
        const encryptedPassword = await bcrypt.hash(password, 10);

        const registrationCode = uuidv4(); //generate id that activates user, eliminates registration code.
        
        const insertId = await insertUser({
            email,
            encryptedPassword,
            name,
            registrationCode
        });
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
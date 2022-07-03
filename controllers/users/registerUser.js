const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { insertUser, selectUserByEmail } = require("../../repositories/users");


const registerUser = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        const userWithSameEmail = await selectUserByEmail(email);

         if (userWithSameEmail) {
             const error = new Error("Already exists an user with that email");
             error.statusCode = 400;
             throw error; //change por helpers generateError
         }
        
        const encryptedPassword = await bcrypt.hash(password, 10);

        const registrationCode = uuidv4(); //generate id that activates user, eliminates registration code.
        
        const insertId = await insertUser({ email, encryptedPassword, name, registrationCode });

        res.status(201).send({ status: "ok 🚀 ", data: { id: insertId} });
    } catch (error) {
        next(error)
    }
};

module.exports = registerUser;
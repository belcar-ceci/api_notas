const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { selectUserByEmail } = require("../../repositories/users");
const { generateError } = require("../../helpers");
const { loginUserSchema } = require("../../schemas/users");

const loginUser = async (req, res, next) => {
    try {
        await loginUserSchema.validateAsync(req.body);

        const { email, password } = req.body;

        const user = await selectUserByEmail(email);


    const encryptedPassword = user?.password; //select password

    const isLoginValid = //true o false
      user && (await bcrypt.compare(password, encryptedPassword));//user undefine
    
        if (!isLoginValid) {
        generateError("Wrong password or email", 400)
    }
    /*const isPasswordOk = await bcrypt.compare(password, encryptedPassword)
    
    if (!isPasswordOk) { //if there is no user or password it sends an error
        const error = new Error("Wrong password or email")
        error.statusCode = 400;
        throw error;
    }   */ 
    
    if (user.registrationCode) {
        generateError("User not Activated. Check your email", 400);
    }
        
    //info to save in the token
    const tokenPayload = {
      id: user.id,
      role: user.role,
    };
    //generate token with 3 params and expire
        const token = jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
        res.status(200).send({
            status: "ok 👌 ",
            data: { token }
        }); //sending token for user
    } catch (error) {
        next(error);
    }
};

module.exports = loginUser;
const jwt = require("jsonwebtoken");

const validateAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

      if (!authorization) {
        const error = new Error("Missing authoritation header");
        error.statusCode = 400;
        throw error;
    }

    const [tokenType, token] = authorization.split(" ");

    console.log(tokenType, token);
      
    if (tokenType !== "Bearer" || !token) {
      const error = new Error("Invalid token format");
        error.statusCode = 400;
        throw error;
    }

    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);

    req.auth = tokenInfo; //prop  auth and adding tokenInfo

    next();//send controller createNote
  } catch (error) {
    next(error);
  }
};

module.exports = validateAuth;

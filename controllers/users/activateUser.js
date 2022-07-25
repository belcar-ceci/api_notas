const {
  selectUserByActivationCode,
  deleteRegistrationCode,
} = require("../../repositories/users");
const { generateError } = require("../../helpers");

const activateUser = async (req, res, next) => {
  try {
    const { registrationCode } = req.params; //Trae el codigo de los params

    const user = await selectUserByActivationCode(registrationCode); //busca en la base datos si hay un usuario con ese codigo

    if (!user) {
      throw generateError("Invalid registration code or already activated", 404);
    }

    //si hay usuario con codigo de registro, hay q activarlo, eliminando el codigo de la base de datos
    await deleteRegistrationCode(user.id);

    res.status(200).send({
      status: "ok 🚀 ",
      message: "User activated"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = activateUser;
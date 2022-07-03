const insertUser = require("./insertUser");
const selectUserByActivationCode = require("./selectUserByActivationCode");
const deleteRegistrationCode = require("./deleteRegistrationCode");
const selectUserByEmail = require("./selectUserByEmail")


module.exports = {
    insertUser,
    selectUserByActivationCode,
    deleteRegistrationCode,
    selectUserByEmail
};
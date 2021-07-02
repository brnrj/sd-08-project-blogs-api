const { errorName, errorPassword, requiredEmail,
     errorEmail, requiredPassword, userAleadyRegistered } = require('./MessagesErros');
const { User } = require('../models/index');

// Referencia regex: https://www.w3resource.com/javascript/form/email-validation.php
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validName = (displayName) => {
    if (displayName.length < 8) return errorName;
};

const ValidEmail = (email) => {
    if (!email) return requiredEmail;
    if (!regexEmail.test(email)) return errorEmail;
};

const validPassword = (password) => {
    if (!password) return requiredPassword;
    if (password.length < 6) return errorPassword;
};

const UserExits = async (email) => {
    const response = await User.findOne({ where: { email } });
    if (response) return userAleadyRegistered;
};

module.exports = {
    validName,
    ValidEmail,
    validPassword,
    UserExits,
};
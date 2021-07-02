const { requiredEmail, requiredPassword, emputyEmail, 
    emputPassword, invalidFields } = require('./MessagesErros');

const { User } = require('../models/index');

const ValidEmail = (email) => {
    if (email === undefined) return requiredEmail;
    if (!email) return emputyEmail;
};

const ValidPassword = (password) => {
    if (password === undefined) return requiredPassword;
    if (!password) return emputPassword;
};

const validUser = async (email) => {
    const response = await User.findOne({ where: { email } });
    if (!response) return invalidFields;
};

module.exports = {
    ValidEmail,
    ValidPassword,
    validUser,
};
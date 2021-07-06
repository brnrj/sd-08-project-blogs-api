const validateEmailOrPassword = (emailOrPassword, field = 'email') => {
    if (emailOrPassword === undefined) return `"${field}" is required`;
    if (!emailOrPassword) return `"${field}" is not allowed to be empty`;
};

const BAD_REQUEST = 400;

const loginValidation = (req, res, next) => {
    const { email, password } = req.body;
    const message = validateEmailOrPassword(email) || validateEmailOrPassword(password, 'password');
    if (message) {
        return res.status(BAD_REQUEST).send({ message });
    }
    next();
};

module.exports = loginValidation;
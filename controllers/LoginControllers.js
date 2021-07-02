const LoginServices = require('../services/LoginServices');

const loginUser = async (req, resp) => {
    const response = await LoginServices.loginUser(req.body);
    resp.status(response.code).json(response.value);
};

module.exports = {
    loginUser,
};

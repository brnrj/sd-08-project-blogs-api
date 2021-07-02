const { ValidEmail, ValidPassword, validUser } = require('../schemas/LoginSchemas');
const { createJWT } = require('../auth/createJWT');

const loginUser = async (object) => {
    const { email, password } = object;
    const response = ValidEmail(email) || ValidPassword(password)
      || await validUser(email);

    if (!response) {
        return { 
            code: 200,
            value: {
                 token: await createJWT(email), 
                },
             };
    }

    return response;
};

module.exports = {
    loginUser,
};
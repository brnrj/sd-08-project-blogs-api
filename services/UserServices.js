const { validName, validPassword, ValidEmail, UserExits } = require('../schemas/UserSchemas');
const { User } = require('../models/index');
const { createJWT } = require('../auth/createJWT');

const CreateUser = async (object) => {
    const { displayName, email, password, image } = object;

    const response = validName(displayName) || ValidEmail(email)
      || validPassword(password) || await UserExits(email);

    if (!response) {
        await User.create({ displayName, email, password, image });
        return {
            code: 201,
            value: {
                token: await createJWT(email),
              },
        };
    }

    return response;
};

const ListUsers = async () => {
    try {
      const users = await User.findAll();
      if (users.length === 0) {
      return {
          code: 404,
          value: {
              message: 'Not found Users',
          },
      }; 
    }
      return {
          code: 200,
          value: users,
      };
    } catch (error) {
        console.log(error);
    }
};

const ListUsersById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        return {
          code: 404,
          value: {
              message: 'User does not exist',
          },
        };
    }

    return {
        code: 200,
        value: user,
    };
};

module.exports = {
    CreateUser,
    ListUsers,
    ListUsersById,
};
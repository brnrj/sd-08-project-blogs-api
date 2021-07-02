const UserServices = require('../services/UserServices');

const CreateUser = async (req, resp) => {
   const response = await UserServices.CreateUser(req.body);

    return resp.status(response.code).json(response.value);
};

const ListUsers = async (req, resp) => {
    const response = await UserServices.ListUsers();

    return resp.status(response.code).json(response.value);
};

const ListUsersById = async (req, resp) => {
    const { id } = req.params;

    const response = await UserServices.ListUsersById(id);

    return resp.status(response.code).json(response.value);
};

module.exports = {
    CreateUser,
    ListUsers,
    ListUsersById,
};
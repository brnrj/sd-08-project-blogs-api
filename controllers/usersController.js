const userService = require('../services/user');
const token = require('../utils/token');

const getAll = async (req, res) => {
    const { authorization } = req.headers;
    const result = await userService.getAll(authorization);

    if (result.message) return res.status(401).json(result);
    res.status(200).json(result);
}; 

const create = async (req, res) => {
    const result = await userService.create(req.body);

    if (result.err) return res.status(409).json({ message: result.err });
    if (result.message) return res.status(400).json(result);
    return res.status(201).json({ token: token() });
};

module.exports = {
    create,
    getAll,
};
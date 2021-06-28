const userService = require('../services/user');
const token = require('../utils/token');

const getAll = async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    if (authorization.length < 15) {
        return res.status(401).json({ message: 'Expired or invalid token' }); 
    }
    const result = await userService.getAll();
    res.status(200).json(result);
}; 

const getById = async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;

    const user = await userService.getAll(id);    
    const findId = user.some((element) => element.dataValues.id === Number(id));
    if (!findId) return res.status(404).json({ message: 'User does not exist' });    
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    if (authorization.length < 15) {
        return res.status(401).json({ message: 'Expired or invalid token' }); 
    }
    const result = await userService.getById(id); 
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
    getById,
};
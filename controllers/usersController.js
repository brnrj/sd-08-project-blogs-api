const userService = require('../services/user');
const token = require('../utils/token');

// const getAll = (req, res) => {
//     userService.findAll().then((users) => {
//         res.status(200).json(users);
//     }).catch((err) => {
//         console.log(err.message);
//         res.status(500).json({ message: 'Algo deu errado' });
//     });
// }; 

const create = async (req, res) => {
    const result = await userService.create(req.body);
    console.log(result);

    if (result.err) return res.status(409).json({ message: result.err });
    if (result.message) return res.status(400).json(result);
    return res.status(201).json({ token: token() });
};

module.exports = {
    create,
    // getAll,
};
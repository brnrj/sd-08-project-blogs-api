const { createNewUser } = require('../../services');

const createUser = async (req, res, _next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const userCreation = await createNewUser({ displayName, email, password, image });
    res.status(201).send(userCreation);
  } catch (e) {
    console.log(e.message, 'Controllers, createUser.js');
    res.status(500).send(e.message);
  }
};

module.exports = createUser;

const { searchAllUsers } = require('../../services');

const searchAllTheUsers = async (_req, res, _next) => {
  try {
    const searching = await searchAllUsers();
    return res.status(200).send(searching);
  } catch (e) {
    console.log(e.message, 'Controllers, searchAllTheUsers.js');
    res.status(500).send(e.message);
  }
};
module.exports = searchAllTheUsers;

const err = require('./err');

const nameIsRequired = {
  code: err.code.BAD_REQ,
  message: err.message.NAME_REQUIRED,
};

const categoryName = (name) => {
  console.log(nameIsRequired, 'oioio');
  if (!name) throw new Error(JSON.stringify(nameIsRequired));
};

module.exports = {
  categoryName,
};
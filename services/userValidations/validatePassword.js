const BAD_REQUEST_STATUS = 400;

const messageReturn = (message) => ({
  err: {
    status: BAD_REQUEST_STATUS,
    message,
  },
});

const isvalidPassword = (password) => {
  if (password === undefined) return messageReturn('"password" is required');
  if (password === '') return messageReturn('"password" is not allowed to be empty');
  if (password.length < 6) return messageReturn('"password" length must be 6 characters long');
  return true;
};

module.exports = isvalidPassword;

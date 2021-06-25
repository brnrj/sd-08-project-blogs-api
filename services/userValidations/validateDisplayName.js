const BAD_REQUEST_STATUS = 400;

const messageReturn = (message) => ({
  err: {
    status: BAD_REQUEST_STATUS,
    message,
  },
});

const isValidDisplayName = (displayName) => {
  if (displayName.length < 8) {
    return messageReturn(
      '"displayName" length must be at least 8 characters long',
    );
  }
  return true;
};

module.exports = isValidDisplayName;

const BAD_REQUEST_STATUS = 400;

const validateName = (name) => {
  if (name === undefined) {
    return {
      err: { status: BAD_REQUEST_STATUS, message: '"name" is required' },
    };
  }
  return true;
};

module.exports = validateName;
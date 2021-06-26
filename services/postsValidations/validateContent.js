const BAD_REQUEST_STATUS = 400;

const validateContent = (content) => {
  if (content === undefined) {
    return {
      err: { status: BAD_REQUEST_STATUS, message: '"content" is required' },
    };
  }
  return {};
};

module.exports = validateContent;

const errorHandling = (callback) =>
  async (...args) => {
    try {
      return callback(...args);
    } catch (error) {
      console.log(error.message);
      return process.exit(1);
    }
  };

module.exports = errorHandling;

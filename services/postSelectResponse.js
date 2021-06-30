const { STATUS, ERR } = require('../config/messages');

const selectCode = (error) => {
   switch (error.message) {
    case ERR.unauthorizedUser:
     return STATUS.unauthorized;
    case ERR.titleRequired:
      return STATUS.badRequest; 
    case ERR.contentRequired:
     return STATUS.badRequest;
    default:
      return STATUS.badRequest;
  }
};
const selectMessage = (error) => {
  switch (error.message) {
    case ERR.unauthorizedUser:
      return ERR.unauthorizedUser;
    case ERR.titleRequired:
      return ERR.titleRequired;
    case ERR.contentRequired:
     return ERR.contentRequired;
    default:
      return ERR.categoriesNotEdited;
  }
};

module.exports = {
  selectCode,
  selectMessage,  
};

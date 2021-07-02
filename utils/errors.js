const errors = {
  BAD_REQUEST: {
    status: 400,
    User: {
      Registration: {
        nameMinLength: {
          message: '"displayName" length must be at least 8 characters long',
        },
        invalidEmail: {
          message: '"email" must be a valid email',
        },
        emailRequired: {
          message: '"email" is required',
        },
        passwordMinLength: {
          message: '"password" length must be 6 characters long',
        },
        passwordRequired: {
          message: '"password" is required',
        },
      },
    },
    Login: {
      emailRequired: {
        message: '"email" is required',
      },
      passwordRequired: {
        message: '"password" is required',
      },
      emailEmpty: {
        message: '"email" is not allowed to be empty',
      },
      passwordEmpty: {
        message: '"password" is not allowed to be empty',
      },
      userInexists: {
        message: 'Invalid fields',
      },
    },
    Categories: {
      Register: {
        nameRequired: {
          message: '"name" is required',
        },
      },
      // Listing: {
      // }
    },
    BlogPost: {
      Register: {
        titleRequired: {
          message: '"title" is required',
        },
        contentRequired: {
          message: '"content" is required',
        },
        categoryIdRequired: {
          message: '"categoryId" is required',
        },
        categoryIdsNotFound: {
          message: '"categoryIds" not found',
        },
      },
      Editing: {
        cantEditCateg: {
          message: '"Categories" cannot be edited',
        },
      },
    },
  },
  CONFLICT: {
    status: 409,
    User: {
      emailNotUnique: {
        message: 'User already registered',
      },
    },
    Category: {
      categoryNotUnique: {
        message: 'Category already registered',
      },
    },
  },
  NOT_FOUND: {
    status: 404,
    User: {
      userNotFound: {
        message: 'User does not exist',
      },
    },
    BlogPost: {
      postNotFound: {
        message: 'Post does not exist',
      },
    },
    Category: {
      categoryNotFound: {
        message: 'Category does not exist',
      },
    },
  },
  UNAUTHORIZED: {
    status: 401,
    Token: {
      tokenNotFound: {
        message: 'Token not found',
      },
      invalidToken: {
        message: 'Expired or invalid token',
      },
    },
  },
};

module.exports = errors;

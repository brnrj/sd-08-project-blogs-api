module.exports = {
  api: {
    secret: 'trybe-project',
  },
  resources: {
    Users: {
      singular: 'user',
      basePath: 'user', // path to resource without params and queries
      tableOrCollec: 'Users',
      insertMocks: [ //insert at least two examples
        {
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
          key4: 'value4',
        },
        {
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
          key4: 'value4',
        },
      ],
    },
    Categories: {
      singular: 'category',
      basePath: 'categories', // path to resource without params and queries
      tableOrCollec: 'Categories',
      insertMocks: [ //insert at least two examples
        {
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
          key4: 'value4',
        },
        {
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
          key4: 'value4',
        },
      ],
    },
    BlogPosts: {
      singular: 'post',
      basePath: 'post', // path to resource without params and queries
      tableOrCollec: 'BlogPosts',
      insertMocks: [ //insert at least two examples
        {
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
          key4: 'value4',
        },
        {
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
          key4: 'value4',
        },
      ],
    },
  },
};

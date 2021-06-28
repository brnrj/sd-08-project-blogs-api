'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostsCategories', {
      BlogPostId: {
        type: Sequelize.INTEGER,
        field: 'BlogPostId',
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
        primaryKey: true,
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        field: 'CategoryId',
        references: {
          model: 'Categories',
          key: 'id',
        },
        primaryKey: true,
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postsCategoriesTable = queryInterface.createTable('PostsCategories', {
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Categories', key: 'id' },
        primaryKey: true,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'BlogPosts', key: 'id' },
        primaryKey: true,
      }
    });
    return postsCategoriesTable;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PostsCategories');
  }
};

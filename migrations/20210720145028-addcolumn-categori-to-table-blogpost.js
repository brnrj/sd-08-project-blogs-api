'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('BlogPosts', 'categories', {
      type: Sequelize.INTEGER,
      onUpdate: "CASCADE",
      onDelete:"CASCADE",
      references: { model: 'Categories', foreignkey: 'id'  }
    })
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('BlogPosts', 'categories');
  }
};


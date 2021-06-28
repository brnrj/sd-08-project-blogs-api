'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      }, content: {
        type: Sequelize.STRING,

      }, userId: {
        defaultValue: 1,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        type: Sequelize.INTEGER,
        references: { //faz ref
          model: "Users", // ao modelo Users
          foreignkey: "id" // na chave id
        }
      },
      published: {
        type: Sequelize.DATE
      }, updated: {
        type: Sequelize.DATE
      }


    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};
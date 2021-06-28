'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('users', {
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
       },
       displayName: {
         type: Sequelize.STRING,
         allowNull: false,
       },
       email: {
         type: Sequelize.STRING,
         unique: true,
         allowNull: false,
       },
       password: {
         type: Sequelize.INTEGER,
         allowNull: false,
       },
       image: {
         type: Sequelize.STRING,
         allowNull: true,
       },
       createAt: {
         type: Sequelize.DATE,
         allowNull: false,
       },
       updateAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};

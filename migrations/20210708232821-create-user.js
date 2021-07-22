'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      displayName: { type: Sequelize.STRING },
      Email: { type: Sequelize.STRING },
      Password: { type: Sequelize.STRING },
      image: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() }
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
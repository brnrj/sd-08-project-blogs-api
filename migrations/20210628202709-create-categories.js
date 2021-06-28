module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable("Categories", {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name:{
        allowNull: false,
        type: Sequelize.STRING,
      },
    })
    return UsersTable;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("Categories");
  }
};

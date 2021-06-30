const User = (sequelize, DataTypes) => {
    const Users = sequelize.define('User', {
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    }, { timestamps: false });

    Users.associate = (models) => {
        Users.hasMany(models.Post, {
          foreignKey: 'userId', 
          as: 'posts',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        });
    };
    
    return Users;
};

module.exports = User;
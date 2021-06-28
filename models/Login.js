const Login = (sequelize, DataTypes) => {
    const Logins = sequelize.define('Login', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, { timestamps: false });
    return Logins;
};

module.exports = Login;
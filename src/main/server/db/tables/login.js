const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define('Login', {
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        customer: {
            type: DataTypes.INTEGER
        }
    });
}
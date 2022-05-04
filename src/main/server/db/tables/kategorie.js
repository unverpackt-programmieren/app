const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define('Category', {
        titel: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}
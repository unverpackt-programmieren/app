const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define('Product', {
        titel:{
            type: DataTypes.STRING,
            allowNull: false
        },
        beschreibung: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logo: {
            type: DataTypes.TEXT
        },
        preis: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        reservierbar: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    });
}
const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define('Customer', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ansprechpartner: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING
        },
        oeffnungszeitBeginn: {
            type: DataTypes.STRING
        },
        oeffnungszeitEnde: {
            type: DataTypes.STRING
        },
        logo: {
            type: DataTypes.TEXT
        },
        homepage: {
            type: DataTypes.STRING
        },
        beschreibung: {
            type: DataTypes.TEXT
        },
        reservierbar: {
            type: DataTypes.BOOLEAN
        },
        chat: {
            type: DataTypes.BOOLEAN
        }
    });
}
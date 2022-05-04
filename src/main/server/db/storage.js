const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});
const storage = {db: sequelize};
storage.Kunde = require("./tables/kunde")(sequelize);
storage.Produkt = require("./tables/produkt")(sequelize);
storage.Category = require("./tables/kategorie")(sequelize);

storage.Kunde.hasMany(storage.Produkt);
storage.Produkt.belongsTo(storage.Kunde);

storage.Category.hasOne(storage.Produkt);
storage.Produkt.belongsTo(storage.Category);

module.exports = storage;

const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging:false
});
const storage = {db: sequelize};
storage.Kunde = require("./tables/kunde")(sequelize);
storage.Produkt = require("./tables/produkt")(sequelize);
storage.Kategorie = require("./tables/kategorie")(sequelize);

storage.Kunde.hasMany(storage.Produkt);
storage.Produkt.belongsTo(storage.Kunde);

storage.Kategorie.hasOne(storage.Produkt);
storage.Produkt.belongsTo(storage.Kategorie);

module.exports = storage;

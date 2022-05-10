const storage = require("./../db/storage")
module.exports = async (req, res) => {
    const kategorien = await storage.Kategorie.findAll();
    const result = kategorien.map(kategorie => {
        return {
            id: kategorie.dataValues.id,
            value: kategorie.dataValues.titel,
            key: kategorie.dataValues.titel
        }
    })
    res.send(result);
}
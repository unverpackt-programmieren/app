const {Op} = require("sequelize");
const storage = require("./../db/storage")

module.exports = async (req, res) => {
    const matchingKategorien = await storage.Kategorie.findAll({
        where: {
            titel: {
                [Op.like]: req.params.query
            }
        },
        include: {
            model: storage.Produkt
        }
    });
    res.send(matchingKategorien.map(category => {
        let result = category.Product.dataValues;
        result.titel = category.dataValues.titel;
        return result;
    }))
}
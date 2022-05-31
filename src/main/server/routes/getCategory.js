const storage = require("./../db/storage")
module.exports = async (req, res) => {
    const category = await storage.Kategorie.findAll({
        where: {
            id: req.params.categoryId
        }
    });
    res.send(category);
}
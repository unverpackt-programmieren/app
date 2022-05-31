const storage = require("./../db/storage")
module.exports = async (req, res) => {
    const params = String(req.path).split("/")
    params.splice(0, 2);

    const category = await storage.Kategorie.findAll({
        where: {
            id: Number(params[0])
        }
    });
    res.send(category);
}
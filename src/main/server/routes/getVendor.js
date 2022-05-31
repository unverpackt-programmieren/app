const storage = require("./../db/storage")
module.exports = async (req, res) => {
    const vendor = await storage.Kunde.findAll({
        where: {
            id: req.params.vendorId
        }
    });
    res.send(vendor);
}
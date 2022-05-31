const storage = require("./../db/storage");
module.exports = async (req, res) => {

    const where = {
        id: {
            id: Number(req.params.id)
        },
        category: {
            CategoryId: Number(req.params.id)
        },
        vendor: {
            CustomerId: Number(req.params.id)
        }
    };
    where.logos = where.vendor;

    const idMapper = arr => {
        return arr.map(a => a.dataValues.id);
    }

    const mapping = {
        category: idMapper,
        vendor: idMapper,
        logos : arr=>{
            return arr.map(a=>{
                return a.dataValues.logo;
            })
        }
    }

    const query = where[req.params.type];
    if (query === undefined) {
        res.sendStatus(404);
    } else {
        let result = await storage.Produkt.findAll({
            where: query
        });
        const mapper = mapping[req.params.type];
        if(mapper!==undefined){
            result = mapper(result);
        }
        res.send(result);
    }

}
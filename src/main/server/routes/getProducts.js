const storage = require("./../db/storage");
module.exports = async (req, res) => {
    const params = String(req.path).split("/")
    params.splice(0, 2);

    switch(params[0])
    {
        case "id":
            {
                const product = await storage.Produkt.findAll({
                    where: {
                        id : Number(params[1])
                    }
                });
                res.send(product);
            } break;

        case "category":
            {
                const products = await storage.Produkt.findAll({
                    where: {
                        CategoryId : Number(params[1])
                    }
                });

                res.send(products.map((element) => {
                    return element.id;
                }));
            } break;
        
        case "vendor":
            {
                const products = await storage.Produkt.findAll({
                    where: {
                        CustomerId : Number(params[1])
                    }
                });

                res.send(products.map((element) => {
                    return element.id;
                }));
            } break;
            
        default:
            {
                res.send(404);
            }
    }
    
}
const storage = require("./../../db/storage");
module.exports = async (req,res)=>{
    const products=await storage.Produkt.findAll({where:{customerId:req.customer}});
    res.send({products:products.map(p=>p.dataValues)});
}
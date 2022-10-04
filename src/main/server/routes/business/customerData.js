const jwt = require('jsonwebtoken');
const storage = require("./../../db/storage");
module.exports = async (req,res)=>{
    const customer = await storage.Kunde.findOne({where:{id:req.customer}});
    res.send(customer.dataValues);
}
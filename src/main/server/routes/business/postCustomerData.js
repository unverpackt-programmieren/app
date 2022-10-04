const storage = require("./../../db/storage");
module.exports = async (req,res)=>{
    await storage.Kunde.update( req.body, {where:{id:req.customer}});
    res.sendStatus(200);
}
const jwt = require('jsonwebtoken');
const storage = require("./../../db/storage");
const crypto = require("crypto");
module.exports = (serverSecret)=>{
    return async(req,res)=>{
        const kunde = await storage.Login.findOne({where:{login:req.body.login}});
        let allowed=false;
        const password = crypto.createHash('sha1').update(req.body.password).digest('hex');
        if(kunde!==null){
            if(kunde.dataValues.password===password){
                allowed=true;
            }
        }
        if(allowed){
            var token = jwt.sign({ customer: kunde.dataValues.customer }, serverSecret);
            res.cookie('token',token);
            res.sendStatus(200);
        }else{
            res.sendStatus(401);
        }
    }
}
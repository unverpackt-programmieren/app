const express = require('express')
const path = require("path");
const app = express();
const bodyParser = require('body-parser')
let port = 3000;
const appDir = path.resolve(__dirname, '../app')
const storage = require("./db/storage");
const {Op} = require("sequelize");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const nunjucks = require("nunjucks");


var exports = module.exports = {};
const serverSecret = !process.argv[3] ? process.argv[2] : process.argv[3];
const cookieValue= crypto.createHash('sha1').update(serverSecret).digest('hex');

let server;
startServer = async (givenPort) => {
    if(givenPort!==undefined){
        port=givenPort;
    }
    if(serverSecret===undefined){
        console.log("Nur mit Geheimnis startbar");
        return;
    }
    app.use('/dist', express.static('dist'));
    app.use(cookieParser());

    nunjucks.configure('templates', {
        autoescape: true,
        express: app
    });

    await storage.db.sync();
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    const checkCookie = require("./routes/business/checkCookie")(cookieValue, serverSecret);
    const login = require("./routes/business/login")(serverSecret);
    app.get('/', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'dist/index.html'))
    })

    app.post("/login",checkCookie, bodyParser.json(), login);
    app.get("/customer/data", checkCookie, require("./routes/business/customerData"));
    app.post("/customer/data", checkCookie, bodyParser.urlencoded({extended:false}),require("./routes/business/postCustomerData"));
    app.get("/customer/products", checkCookie, require("./routes/business/getCustomerProducts"));

    // REST routen (Daten speichern und abfragen für die App)
    app.get("/search/:query", require("./routes/queryProducts"));
    app.get('/kategorien', require("./routes/getKategorien"));
    app.get("/products/:type/:id", require("./routes/getProducts"));
    app.get("/products/by/category/:categoryId", require("./routes/getProductsByCategory"));
    app.get("/vendor/:vendorId", require("./routes/getVendor"));
    app.get("/category/:categoryId", require("./routes/getCategory"));
    return app.listen(port, () => {
        console.log(`unverpackt-programmieren listening on port ${port}`)
    })
}

module.exports=async(givenPort)=>{
    const server =await startServer(givenPort);
    return {
        app:app,
        server:server
    }
};

if (require.main === module) {
    startServer().then(() => {

    });
}




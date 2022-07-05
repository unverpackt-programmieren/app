const express = require('express')
const path = require("path");
const app = express()
let port = !process.argv[2] ? 3000 : process.argv[2];
const appDir = path.resolve(__dirname, '../app')
const storage = require("./db/storage");
const {Op} = require("sequelize");
var exports = module.exports = {};
let server;
startServer = async (givenPort) => {
    if(givenPort!==undefined){
        port=givenPort;
    }
    app.use('/', express.static('html'));
    app.get("/apt", (req, res) => {
        res.sendFile(path.resolve(appDir, 'platforms/android/app/build/outputs/apk/debug/app-debug.apk'));
    })
    await storage.db.sync();
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
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




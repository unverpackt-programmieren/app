const express = require('express')
const path = require("path");
const app = express()
const port = !process.argv[2] ? 3000 : process.argv[2];
const appDir = path.resolve(__dirname, '../app')
const storage = require("./db/storage");
const {Op} = require("sequelize");

startServer = async () => {
    app.get("/apt", (req, res) => {
        res.sendFile(path.resolve(appDir, 'platforms/android/app/build/outputs/apk/debug/app-debug.apk'));
    })
    await storage.db.sync();
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.get("/search/:query", require("./routes/queryProducts"));
    app.get('/kategorien', require("./routes/getKategorien"));
    app.listen(port, () => {
        console.log(`unverpackt-programmieren listening on port ${port}`)
    })
}

startServer().then(() => {

});
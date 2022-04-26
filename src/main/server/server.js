const express = require('express')
const path = require("path");
const app = express()
const port = !process.argv[2] ? 3000 : process.argv[2];
const appDir = path.resolve(__dirname, '../app')
app.use('/preview', express.static(path.resolve(appDir, 'www')));
app.get("/apt", (req, res) => {
    res.sendFile(path.resolve(appDir, 'platforms/android/app/build/outputs/apk/debug/app-debug.apk'));
})
app.listen(port, () => {
    console.log(`unverpackt-programmieren listening on port ${port}`)
})
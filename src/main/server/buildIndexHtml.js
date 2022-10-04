const fs = require("fs");
const path = require("path");
const templateDir = path.resolve(__dirname,'templates')
const html = fs.readFileSync(path.resolve(templateDir,'index.html')).toString();
let pages='';
fs.readdirSync(path.resolve(templateDir,'pages')).forEach(file=>{
    const name = file.replaceAll('.html','');
    const content = fs.readFileSync(path.resolve(templateDir,'pages',file)).toString();
    pages+=`<script id="${name}" type="text/html">${content}</script>`
})
fs.writeFileSync(path.resolve(__dirname,'dist','index.html'), html.replaceAll('#PAGES', pages));
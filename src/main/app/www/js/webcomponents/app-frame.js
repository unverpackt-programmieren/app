const config = require("./../config/config");
const TopBar = require("./top-bar");
const BottomBar = require("./bottom-bar");
const dom = require("./../utils/dom");
const sql = require("./../utils/webSQL");

class AppFrame extends HTMLElement {
    async prepareDB() {
        const createProfile = await sql("CREATE TABLE IF NOT EXISTS Profile (lastQuery)");
        await sql("INSERT INTO Profile(lastQuery) values(?)",['Huhu diese DB ist alt!']);
        return true;
    }

    connectedCallback() {
        this.prepareDB().then(() => {
            this.show(config.pages.Search, TopBar, BottomBar);
        })
    }

    show(newPageComponent, newTopBar, newBottomBar) {
        this.pageContent.innerHTML = '';
        this.pageContent = dom.div(new newPageComponent()).class('content').create();
        alert("pagecontent");
        const content = dom.div([
            new newTopBar(),
            this.pageContent,
            new newBottomBar()
        ]).create();
        alert("pack");
        this.appendChild(content);
    }
}

window.customElements.define('app-frame', AppFrame);
module.exports = AppFrame;
const config = require("./../config/config");
const TopBar = require("./top-bar");
const BottomBar = require("./bottom-bar");
const dom = require("./../utils/dom");
const sql = require("./../utils/webSQL");

class AppFrame extends HTMLElement {
    async prepareDB() {
        const createProfile = await sql("CREATE TABLE IF NOT EXISTS Profile (lastQuery)");
        const existsProfile = await sql("SELECT count(lastQuery) FROM Profile");
        return true;
    }

    connectedCallback() {
        this.prepareDB().then(() => {
            this.pageContent = dom.div(new config.pages.Search()).class('content').create();
            const content = dom.div([
                new TopBar(),
                this.pageContent,
                new BottomBar()
            ]).create();
            this.appendChild(content);
        })
    }

    show(Component) {
        this.pageContent.innerHTML = '';
        this.pageContent.appendChild(new Component());
    }
}

window.customElements.define('app-frame', AppFrame);
module.exports = AppFrame;
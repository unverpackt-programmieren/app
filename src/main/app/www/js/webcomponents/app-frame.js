const { pages } = require("./../config/config");
const config = require("./../config/config");
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
            this.show(config.pages.Search);
        })
    }

    show(Component) {
        this.innerHTML = "";
        this.pageContent = dom.div(new Component.content()).class('content').create();
        const content = dom.div([
            Component.top ? new Component.top() : null,
            this.pageContent,
            Component.bottom ? new Component.bottom() : null
        ]).create();

        this.appendChild(content);
    }
}

window.customElements.define('app-frame', AppFrame);
module.exports = AppFrame;
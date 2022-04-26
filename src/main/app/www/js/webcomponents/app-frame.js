const config = require("./../config/config");
const TopBar = require("./top-bar");
const BottomBar = require("./bottom-bar");
const dom = require("./../utils/dom");

class AppFrame extends HTMLElement {
    init(db) {
        this.db = db;
        this.render();
    }

    render() {
        this.pageContent = dom.div(new config.pages.Search()).class('content').create();
        const content = dom.div([
            new TopBar(),
            this.pageContent,
            new BottomBar()
        ]).create();
        this.appendChild(content);
    }

    show(Component) {
        this.pageContent.innerHTML = '';
        this.pageContent.appendChild(new Component());
    }

    connectedCallback() {
        // TODO: Fallback wenn die DB nicht geladen wird
    }
}

window.customElements.define('app-frame', AppFrame);
module.exports = AppFrame;
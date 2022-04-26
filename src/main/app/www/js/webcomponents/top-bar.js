const config = require("./../config/config");
const dom = require("./../utils/dom");

class TopBar extends HTMLElement {
    connectedCallback() {
        const language = config.language;
        const content = dom.div(
            dom.h2(config.i18n[language].name).create()
        ).create();
        this.appendChild(content);
    }
}

window.customElements.define('top-bar', TopBar);
module.exports = TopBar;
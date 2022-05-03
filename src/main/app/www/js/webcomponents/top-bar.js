const config = require("./../config/config");
const dom = require("./../utils/dom");
const NavigationButton = require("./navigation-button");

class TopBar extends HTMLElement {
    connectedCallback() {
        const language = config.language;
        const impressumButton = new NavigationButton();
        impressumButton.init(config.i18n[language].bottom.impressum, config.pages.Impressum);
        const content = dom.div(
            [
                dom.h2(config.i18n[language].name).create(),
                impressumButton
            ]
        ).create();
        this.appendChild(content);
    }
}

window.customElements.define('top-bar', TopBar);
module.exports = TopBar;
const dom = require("./../utils/dom");
const NavigationButton = require("./navigation-button");

class SettingsTop extends HTMLElement {
    connectedCallback() {
        const config = require("./../config/config");

        const language = config.language;
        const backButton = new NavigationButton();
        backButton.init("←", config.pages.Search);
        const content = dom.div(
            [
                backButton,
                dom.text(config.i18n[language].bottom.settings).create()
            ]
        ).create();
        this.appendChild(content);
    }
}

window.customElements.define('settings-top-bar', SettingsTop);
module.exports = SettingsTop;
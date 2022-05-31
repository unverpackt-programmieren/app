const HTMLComponentBase = require("./htmlcomponentbase");
const NavigationButton = require("./navigation-button");

class SettingsTop extends HTMLComponentBase {
    connectedCallback() {
        const backButton = new NavigationButton();
        backButton.init("←", this.config.pages.Search);
        const content = this.dom.div(
            [
                backButton,
                this.dom.text(this.safe_i18n("./bottom/search")).create()
            ]
        ).create();
        this.appendChild(content);
    }
}

window.customElements.define('settings-top-bar', SettingsTop);
module.exports = SettingsTop;
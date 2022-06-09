
const HTMLComponentBase = require("./htmlcomponentbase");
const NavigationButton = require("./navigation-button");

class TopBar extends HTMLComponentBase {
    connectedCallback() {
        const impressumButton = new NavigationButton();
        impressumButton.init(this.safe_i18n("top.impressum"), this.config.pages.Impressum);
        const content = this.dom.div(
            [
                this.dom.h2(this.safe_i18n("name")).create(),
                impressumButton
            ]
        ).create();
        this.appendChild(content);
    }
}

window.customElements.define('top-bar', TopBar);
module.exports = TopBar;
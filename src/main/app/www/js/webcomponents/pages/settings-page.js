const { i18n } = require("./../../config/config");
const config = require("./../../config/config");
const dom = require("./../../utils/dom");

class SettingsPage extends HTMLElement {
    connectedCallback() {
        
        this.innerHTML = "dummy";
    }
}

window.customElements.define('settings-page', SettingsPage);
module.exports = SettingsPage;
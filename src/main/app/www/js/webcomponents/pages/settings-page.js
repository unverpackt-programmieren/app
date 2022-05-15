const HTMLComponentBase = require("./../htmlcomponentbase");

class SettingsPage extends HTMLComponentBase {

    connectedCallback() {
        this.innerHTML = this.safe_i18n("./bottom/settings");
    }
}

window.customElements.define('settings-page', SettingsPage);
module.exports = SettingsPage;
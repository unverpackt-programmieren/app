class SettingsPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 'Ich bin die Einstellungsseite';
    }
}

window.customElements.define('settings-page', SettingsPage);
module.exports = SettingsPage;
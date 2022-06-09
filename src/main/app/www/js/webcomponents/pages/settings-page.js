const HTMLComponentBase = require("./../htmlcomponentbase");

class SettingsPage extends HTMLComponentBase {

    connectedCallback() {
        var languages = Object.keys(this.config.i18n);
        for(var i = 0; i < languages.length; i++)
        {
            languages[i] = this.dom.option(languages[i]).create();
        }
        this.langDropDown = this.dom.select(languages).create();

        this.darkMode = this.dom.input().create();
        this.darkMode.type = "checkbox";

        this.minTraffic = this.dom.input().create();
        this.minTraffic.type = "checkbox";

        const saveBtn = this.dom.button(this.safe_i18n("settings.saveButton")).create();
        saveBtn.addEventListener("click", () => {
            this.saveChanges(this);
        });

        this.appendChildren(this.dom.div([this.dom.text(this.safe_i18n("settings.language_label")).create(), this.langDropDown]).create(),
                            this.dom.div([this.dom.text(this.safe_i18n("settings.darkmode_label")).create(), this.darkMode]).create(),
                            this.dom.div([this.dom.text(this.safe_i18n("settings.mintraffic_label")).create(), this.minTraffic]).create(),
                            saveBtn);

        this.loadSettings();
    }

    saveChanges(inst)
    {
        if(inst.config.i18n[inst.langDropDown.value] != null)
        {
            inst.config.user.language = inst.langDropDown.value;
        }
        
        inst.config.user.darkmode = inst.darkMode.checked;
        inst.config.user.minimizeTraffic = inst.minTraffic.checked;

        $('app-frame').reload();
    }

    loadSettings()
    {
        this.langDropDown.value = this.config.user.language;
        this.darkMode.checked = this.config.user.darkmode;
        this.minTraffic.checked = this.config.user.minimizeTraffic;
    }
}

window.customElements.define('settings-page', SettingsPage);
module.exports = SettingsPage;
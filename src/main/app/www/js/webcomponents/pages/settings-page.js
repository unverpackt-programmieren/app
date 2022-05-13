const HTMLComponentBase = require("./../htmlcomponentbase");
const { i18n } = require("./../../config/config");
const dom = require("./../../utils/dom");

class SettingsPage extends HTMLComponentBase {

    

    connectedCallback() {
        
        //const lang = this.config.language;

        const a = "bottom";
        const b= "search";
        this.innerHTML = HTMLComponentBase.safe_i18n("./bottom/settings");
        //this.innerHTML = typeof SettingsPage.config;
    }

    /*safe_i18n(langpath)
    {
        var pathstr = String(langpath);
        var splitpath = pathstr.split("/");

        var prop = HTMLComponentBase.config.i18n[splitpath[0]];
        for(var i = 1; i < splitpath.length; i++)
        {
            prop = prop[splitpath[i]];
        }
        return prop;
    }*/
}

window.customElements.define('settings-page', SettingsPage);
module.exports = SettingsPage;
const HTMLComponentBase = require("./htmlcomponentbase");
const NavigationButton = require("./navigation-button");

class BottomBar extends HTMLComponentBase {
    connectedCallback() {
        const searchButton = new NavigationButton();
        searchButton.init(this.safe_i18n("./bottom/search"), this.config.pages.Search);
        const favouritesButton = new NavigationButton();
        favouritesButton.init(this.safe_i18n("./bottom/favourites"), this.config.pages.Favourites);
        const settingsButton = new NavigationButton();
        settingsButton.init(this.safe_i18n("./bottom/settings"), this.config.pages.Settings);
        
        const content = this.dom.div([
            searchButton, favouritesButton, settingsButton
        ]).create();
        this.appendChild(content);
    }
}

window.customElements.define('bottom-bar', BottomBar);
module.exports = BottomBar;
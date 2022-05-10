//const config = require("./../config/config");
const dom = require("./../utils/dom");
const NavigationButton = require("./navigation-button");

class BottomBar extends HTMLElement {
    connectedCallback() {
        const config = require("./../config/config");

        const language = config.language;
        const searchButton = new NavigationButton();
        searchButton.init(config.i18n[language].bottom.search, config.pages.Search);
        const favouritesButton = new NavigationButton();
        favouritesButton.init(config.i18n[language].bottom.favourites, config.pages.Favourites);
        const settingsButton = new NavigationButton();
        settingsButton.init(config.i18n[language].bottom.settings, config.pages.Settings);
        
        const content = dom.div([
            searchButton, favouritesButton, settingsButton
        ]).create();
        this.appendChild(content);
    }
}

window.customElements.define('bottom-bar', BottomBar);
module.exports = BottomBar;
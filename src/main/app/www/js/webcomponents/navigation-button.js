const dom = require("./../utils/dom");

const TopBar = require("./top-bar");
const BottomBar = require("./bottom-bar");

class NavigationButton extends HTMLElement {
    init(title, componentToLoad) {
        const button = dom.button(title).create();
        this.appendChild(button);
        this.addEventListener('click', () => {
            $('app-frame').show(componentToLoad, TopBar, BottomBar);
        })
    }
}

window.customElements.define('navigation-button', NavigationButton);
module.exports = NavigationButton;
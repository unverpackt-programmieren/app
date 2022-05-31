const HTMLComponentBase = require("./htmlcomponentbase");

class NavigationButton extends HTMLComponentBase {
    init(title, componentToLoad, params) {

        const button = this.dom.button(title).create();
        this.appendChild(button);
        this.addEventListener('click', () => {
            $('app-frame').show(componentToLoad, params);
        })
    }
}

window.customElements.define('navigation-button', NavigationButton);
module.exports = NavigationButton;
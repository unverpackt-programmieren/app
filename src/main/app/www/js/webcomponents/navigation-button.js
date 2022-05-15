const HTMLComponentBase = require("./htmlcomponentbase");

class NavigationButton extends HTMLComponentBase {
    init(title, componentToLoad) {

        const button = this.dom.button(title).create();
        this.appendChild(button);
        this.addEventListener('click', () => {
            $('app-frame').show(componentToLoad);
        })
    }
}

window.customElements.define('navigation-button', NavigationButton);
module.exports = NavigationButton;
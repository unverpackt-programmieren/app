const dom = require("./../utils/dom");

class NavigationButton extends HTMLElement {
    init(title, componentToLoad) {
        const button = dom.button(title).create();
        this.appendChild(button);
        this.addEventListener('click', () => {
            $('app-frame').show(componentToLoad);
        })
    }
}

window.customElements.define('navigation-button', NavigationButton);
module.exports = NavigationButton;
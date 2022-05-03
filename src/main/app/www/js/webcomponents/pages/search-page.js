const dom = require("./../../utils/dom");
const config = require("./../../config/config");

class SearchPage extends HTMLElement {
    connectedCallback() {
        const query = dom.input().type('text').create();
        this.appendChild(query);
        query.addEventListener('keyup', () => {
            console.log(query.value);
        })
    }
}

window.customElements.define('search-page', SearchPage);
module.exports = SearchPage;
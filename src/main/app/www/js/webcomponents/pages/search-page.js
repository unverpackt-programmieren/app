const dom = require("./../../utils/dom");
const Tribute = require("tributejs");
const superagent = require("superagent");

class SearchPage extends HTMLElement {

    async createAutoComplete(queryField) {
        const rs= await superagent.get('http://localhost:3000/kategorien')
        var tribute = new Tribute({
            values: rs.body,
            autocompleteMode: true
        });
        tribute.attach(queryField);
    }

    connectedCallback() {
        const config = require("./../../config/config");
        const language = config.language;
        const placeholder = config.i18n[language].search.placeholder;
        const query = dom.div(placeholder).contenteditable('true').create();
        query.addEventListener('focus', () => {
            query.textContent = '';
        })
        query.addEventListener('focusout', () => {
            console.log(query.textContent)
            if (query.textContent === '') {
                query.textContent = placeholder;
            }
        })
        this.appendChild(query);
        this.createAutoComplete(query).then(() => {

        })

    }
}

window.customElements.define('search-page', SearchPage);
module.exports = SearchPage;
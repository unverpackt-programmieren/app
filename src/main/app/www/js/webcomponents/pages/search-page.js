const HTMLComponentBase = require("./../htmlcomponentbase");
const Tribute = require("tributejs");
const superagent = require("superagent");

class SearchPage extends HTMLComponentBase {

    async createAutoComplete(queryField) {
        const rs= await superagent.get('http://localhost:3000/kategorien')
        var tribute = new Tribute({
            values: rs.body,
            autocompleteMode: true
        });
        tribute.attach(queryField);
    }

    connectedCallback() {
        const placeholder = this.safe_i18n("./search/placeholder");
        const query = this.dom.div(placeholder).contenteditable('true').create();
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
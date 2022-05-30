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

        //remove later
        const dummyProduct = new (require("./../navigation-button"))();
        dummyProduct.init("dummy", this.config.pages.Product, 1);

        const dummyId = this.dom.input().create();
        dummyId.addEventListener("change", () => {
            dummyProduct.init("dummy", this.config.pages.Product, dummyId.value);
        });
        this.appendChildren(dummyId, dummyProduct);

        const dummyCategory = new (require("./../navigation-button"))();
        dummyCategory.init("dummy2", this.config.pages.Category, 1);

        const dummyId2 = this.dom.input().create();
        dummyId2.addEventListener("change", () => {
            dummyCategory.init("dummy2", this.config.pages.Category, dummyId2.value);
        });
        this.appendChildren(dummyId2, dummyCategory);
    }
}

window.customElements.define('search-page', SearchPage);
module.exports = SearchPage;
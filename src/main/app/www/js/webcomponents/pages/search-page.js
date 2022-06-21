const HTMLComponentBase = require("./../htmlcomponentbase");
const Tribute = require("tributejs");
const superagent = require("superagent");
const SearchResult = require("./../search-result")

class SearchPage extends HTMLComponentBase {

    async createAutoComplete(queryField) {
        const rs= await superagent.get('http://localhost:3000/kategorien')
        
        var tribute = new Tribute({
            values: rs.body,
            autocompleteMode: true
        });
        tribute.attach(queryField);
    }

    renderSearchResults(products){
        this.list.innerHTML='';
        products.forEach(product=>{
            const item = new SearchResult();
            this.list.appendChild(this.dom.li(item).create());
            item.load(product);
        })
    }

    connectedCallback() {
        const placeholder = this.safe_i18n("search.placeholder");
        const query = this.dom.div(placeholder).contenteditable('true').create();
        query.addEventListener('focus', () => {
            query.textContent = '';
        })
        query.addEventListener('tribute-replaced', async (evt) => {
            const categoryId = evt.detail.item.original.id;
            const rs= await superagent.get('http://localhost:3000/products/by/category/'+categoryId);
            sessionStorage.setItem(this.tagName, JSON.stringify({
                [query.textContent]:rs.body
            }));
            this.renderSearchResults(rs.body);
        })
        query.addEventListener('focusout', () => {
            
            if (query.textContent === '') {
                query.textContent = placeholder;
            }
        })
        this.appendChild(query);
        this.createAutoComplete(query).then(() => {
            
        })
        this.list = this.dom.ul().create();
        this.appendChild(this.list);
        const fromSession = sessionStorage.getItem(this.tagName);
        if(fromSession!==null){
            const obj = JSON.parse(fromSession);
            const title = Object.keys(obj)[0];
            query.textContent = title;
            this.renderSearchResults(obj[title]);
        }
    }
}

window.customElements.define('search-page', SearchPage);
module.exports = SearchPage;
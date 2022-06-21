const HTMLComponentBase = require("./htmlcomponentbase");

class SearchResult extends HTMLComponentBase {
    connectedCallback(){
        const wrapper = this.dom.div().create();
        this.appendChild(wrapper);
        this.img = this.dom.img().create();
        this.headline = this.dom.h2().create();
        wrapper.appendChild(this.headline);
        wrapper.appendChild(this.img);
        
    }
    load(product){
        this.img.setAttribute('src', product.logo);
        this.headline.textContent = product.beschreibung;
        this.addEventListener('click', ()=>{
            console.log("results " + product.id);
            $("app-frame").show(this.config.pages.Product, [product.id]);
        })
    }
}

window.customElements.define('search-result', SearchResult);
module.exports = SearchResult;
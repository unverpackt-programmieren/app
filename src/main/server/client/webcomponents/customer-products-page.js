const ServerBasePage = require("./server-base-page");
const dom = require("./../../../app/www/js/utils/dom");

class CustomerProductsPage extends ServerBasePage {
    templateSelector() {
        return "#customer-products";
    }

    connectedCallback(){
        const content = dom.div().create();
        this.appendChild(content);
        this.get('/customer/products').then(d=>{
            this.render(content,d);
        });
    }
}
window.customElements.define('customer-products-page', CustomerProductsPage);
module.exports=CustomerProductsPage;
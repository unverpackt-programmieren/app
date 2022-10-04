const dom = require("./../../../app/www/js/utils/dom");
const ServerBasePage = require("./server-base-page");

class CustomerDataPage extends ServerBasePage {

    templateSelector() {
        return '#customer-data'
    }

    connectedCallback() {
        const content = dom.div().create();
        this.appendChild(content);
        this.get('/customer/data').then(d=>{
            this.render(content, d);
        });
    }
}

window.customElements.define('customer-data-page', CustomerDataPage);
module.exports = CustomerDataPage;
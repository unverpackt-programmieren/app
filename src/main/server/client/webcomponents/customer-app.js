const dom = require("./../../../app/www/js/utils/dom");
const superagent = require("superagent");
const CustomerDataPage = require("./customer-data-page");

class CustomerApp extends HTMLElement {
    connectedCallback(){
        this.appendChild(new CustomerDataPage());
    }
}
window.customElements.define('customer-app', CustomerApp);
module.exports=CustomerApp;
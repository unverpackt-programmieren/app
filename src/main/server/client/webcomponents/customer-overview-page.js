const ServerBasePage = require("./server-base-page");
const dom = require("./../../../app/www/js/utils/dom");
const CustomerDataPage = require("./customer-data-page");

class CustomerOverviewPage extends ServerBasePage {
    templateSelector() {
        return "#customer-overview";
    }

    connectedCallback(){
        const content = dom.div().create();
        this.appendChild(content);
        const domTree=this.render(content,{})
    }
}
window.customElements.define('customer-overview-page', CustomerOverviewPage);
module.exports=CustomerOverviewPage;
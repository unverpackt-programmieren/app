const dom = require("./../../../app/www/js/utils/dom");
const superagent = require("superagent");
const CustomerOverviewPage = require("./customer-overview-page");
require("./customer-data-page");
require("./customer-products-page");
const ServerBasePage = require("./server-base-page");

class CustomerApp extends ServerBasePage {
    templateSelector() {
        return "#customer-app";
    }

    connectedCallback(){
        const target = dom.div().create();
        this.appendChild(target);
        const domTree=this.render(target,{})
        const content =$('.content', target);
        content.appendChild(new CustomerOverviewPage());
        $$('[target-component]').forEach(button=>{
            button.addEventListener('click', ()=>{
                const attr=button.getAttribute('target-component');
                const Page = window.customElements.get(attr);
                console.log(attr)
                console.log(Page)
                content.innerHTML='';
                content.appendChild( new Page());
            })
        })
    }
}
window.customElements.define('customer-app', CustomerApp);
module.exports=CustomerApp;
const dom = require("./../../../app/www/js/utils/dom");
const superagent = require("superagent");
const Cookies = require("js-cookie");
const nunjucks = require("nunjucks");

class CustomerDataPage extends HTMLElement {
    connectedCallback() {
        nunjucks.configure({ autoescape: true });
        this.innerHTML = this.template('Ricci')
        this.get('/customer/data').then(d=>{
            const template = $('#customer-data').textContent;
            console.log(template)
            console.log(d)
            this.innerHTML = nunjucks.renderString(template, d);
        });
    }

    template(name) {
        return `Hey ${name}`
    }

    async get(url) {
        try {
            const rsp = await superagent.get(url);
            return rsp.body;
        } catch (err) {
            Cookies.remove('token');
            location.reload();
        }
    }

}

window.customElements.define('customer-data-page', CustomerDataPage);
module.exports = CustomerDataPage;
const HTMLComponentBase = require("./../htmlcomponentbase");
const superagent = require("superagent");

class CategoryPage extends HTMLComponentBase {
    async loadData()
    {
        const categoryData = await this.db.getCategory(this.args[0]);
        const productsList = await this.db.products.ofCategory(this.args[0]);

        const title = this.dom.h1("Products of type " + String(categoryData.titel)).create();

        var products = [];
        for(var i = 0; i < productsList.length; i++)
        {
            const price = (await this.db.getProduct(productsList[i])).preis;
            const vendorId = (await this.db.getProduct(productsList[i])).CustomerId;
            const vendorName = (await this.db.getVendor(vendorId)).name;

            const row = this.dom.tr([this.dom.td(String(price) + "€").create(), this.dom.td(vendorName).create()]).create();

            //dont know how to do this without saving it in productId first
            const productId = productsList[i];
            row.addEventListener("click", () => {
                $('app-frame').show(this.config.pages.Product, [productId]);
            });
            products.push(row);
        }
        const productsTable = this.dom.table(products).create();

        return [title, productsTable];
    }
    
    connectedCallback() {
        this.loadData().then((elements) => {
            this.appendChildren(elements);
        })
    }
}

window.customElements.define('category-page', CategoryPage);
module.exports = CategoryPage;
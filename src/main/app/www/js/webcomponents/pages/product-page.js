const HTMLComponentBase = require("./../htmlcomponentbase");
const superagent = require("superagent");


class ProductPage extends HTMLComponentBase {

    async loadProductData()
    {
        console.log(this.args[0]);
        const productData = (await this.db.getProduct(Number(this.args[0])));
        const vendorData = (await this.db.getVendor(productData.CustomerId));
        const categoryData = (await this.db.getCategory(productData.CategoryId));

        const picturePrev = this.dom.img().create();
        picturePrev.src = productData.logo;
        picturePrev.width = 384;
        picturePrev.height = 216;

        const categorie = this.dom.text(categoryData.titel).create();
        categorie.addEventListener("click", () => {
            $('app-frame').show(this.config.pages.Category, [categoryData.id]);
        });
        const vendor = this.dom.text(vendorData.name).create();

        const price = this.dom.h3(productData.preis.toString() + "€").create();

        const description = this.dom.text(productData.beschreibung).create();

        const adress = this.dom.text(vendorData.adresse).create();
        const telephone = this.dom.text(vendorData.telefon).create();

        return [picturePrev,
            this.dom.br().create(),
            categorie,
            this.dom.br().create(),
            vendor,
            this.dom.br().create(),
            price,
            this.dom.br().create(),
            description,
            this.dom.br().create(),
            adress,
            this.dom.br().create(),
            telephone];
    }


    connectedCallback() {
        this.loadProductData().then((elements) => {
            this.appendChildren(elements);
        });
    }
}

window.customElements.define('product-page', ProductPage);
module.exports = ProductPage;
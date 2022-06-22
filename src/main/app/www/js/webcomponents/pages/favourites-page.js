const HTMLComponentBase = require("./../htmlcomponentbase");

class FavouritesPage extends HTMLComponentBase {
    connectedCallback() {
        const titelfavouriten = this.dom.h1(this.safe_i18n("bottom.favourites")).create();

        const tableData = this.dom.div().create();

        const favouritenliste = this.dom.table([
            this.dom.tr([
                this.dom.td( this.safe_i18n("category.vendorname_label") + '<br/>' + this.safe_i18n("products.adress_label") ).create(),
                this.dom.td( this.safe_i18n("favourites.product_label") ).create(),
                this.dom.td( this.safe_i18n("products.price_label") ).create()
            ]).create(),
            tableData
         ]).create();

         this.appendChild(titelfavouriten);
         this.appendChild(favouritenliste);


         tableData.appendChild(this.dom.h1("222222").create());

    }
}

window.customElements.define('favourites-page', FavouritesPage);
module.exports = FavouritesPage;
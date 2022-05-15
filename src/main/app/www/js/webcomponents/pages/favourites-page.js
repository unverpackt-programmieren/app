const HTMLComponentBase = require("./../htmlcomponentbase");

class FavouritesPage extends HTMLComponentBase {
    connectedCallback() {
        const titelfavouriten = this.dom.h1('Favouriten').create();
        const favouritenliste = this.dom.table([
            this.dom.tr([
                this.dom.td( 'Name des Händlers <br/> Adresse' ).create(),
                this.dom.td( 'Produkt').create(),
                this.dom.td( '€' ).create()
            ]).create(),

            this.dom.tr([
                this.dom.td( 'Name des Händlers <br/> Adresse' ).create(),
                this.dom.td( 'Produkt').create(),
                this.dom.td( '€' ).create()
            ]).create()
       
         ]).create();

         this.appendChild(titelfavouriten);
         this.appendChild(favouritenliste);
    }
}

window.customElements.define('favourites-page', FavouritesPage);
module.exports = FavouritesPage;
const config = require("./../../config/config");
const dom = require("./../../utils/dom");

class FavouritesPage extends HTMLElement {
    connectedCallback() {
        const titelfavouriten = dom.h1('Favouriten').create();
        const favouritenliste = dom.table([
            dom.tr([
                dom.td( 'Name des Händlers <br/> Adresse' ).create(),
                dom.td( 'Produkt').create(),
                dom.td( '€' ).create()
            ]).create(),

            dom.tr([
                dom.td( 'Name des Händlers <br/> Adresse' ).create(),
                dom.td( 'Produkt').create(),
                dom.td( '€' ).create()
            ]).create()
       
         ]).create();

         this.appendChild(titelfavouriten);
         this.appendChild(favouritenliste);
    }
}

window.customElements.define('favourites-page', FavouritesPage);
module.exports = FavouritesPage;
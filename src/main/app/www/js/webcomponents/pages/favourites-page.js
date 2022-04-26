class FavouritesPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 'Ich bin die Favoriten';
    }
}

window.customElements.define('favourites-page', FavouritesPage);
module.exports = FavouritesPage;
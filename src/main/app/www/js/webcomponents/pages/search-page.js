class SearchPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 'Ich bin die Suchseite';
    }
}

window.customElements.define('search-page', SearchPage);
module.exports = SearchPage;
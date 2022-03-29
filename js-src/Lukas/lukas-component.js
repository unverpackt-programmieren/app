class AppDrawer extends HTMLElement {

    connectedCallback(){
        this.innerHTML='HEY';
    }
  
  }
  window.customElements.define('my-comp', AppDrawer);
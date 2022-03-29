class AppFrame extends HTMLElement {
    
    connectedCallback(){
        //this.innerHTML='HEY';
        alert("Ehm... Hallo");
    }
    
  }
  
window.customElements.define("ricci-comp", AppFrame);
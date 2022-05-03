class AppFrame extends HTMLElement {
    
    connectedCallback(){
        //this.innerHTML='HEY';
        alert("Ehm... Hallo");
        alert("Test MSG 2");
    }
    
  }
  
window.customElements.define("ricci-comp", AppFrame);
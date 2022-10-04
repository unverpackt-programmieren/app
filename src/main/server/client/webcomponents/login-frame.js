const dom = require("./../../../app/www/js/utils/dom");
const superagent = require("superagent");
class LoginFrame extends HTMLElement {
    connectedCallback(){
        this.appendChild(dom.label("Name").for("name").create());
        const login = dom.input().id("name").type("text").placeholder("Namen eingeben").create();
        this.appendChild(login);
        this.appendChild(dom.label("Passwort").for("password").create());
        const password = dom.input().id("password").type("password").create();
        this.appendChild(password);
        const submit = dom.button("Absenden").create();
        submit.addEventListener('click', async ()=>{
            const rsp = await superagent.post("/login")
                .set('Content-Type', 'application/json')
                .send({login:login.value, password: password.value});
            window.location.reload();
        })
        this.appendChild(submit);
    }
}
window.customElements.define('login-frame', LoginFrame);
module.exports=LoginFrame;
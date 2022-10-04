require("./../../app/www/js/utils/queryDOMElements");
const LoginFrame = require("./webcomponents/login-frame");
const CustomerApp = require("./webcomponents/customer-app");
const Cookies = require("js-cookie");

document.addEventListener('DOMContentLoaded',()=> {
    const login = new LoginFrame();
    if(Cookies.get('token')===undefined){
        $('#content').appendChild(login);
    }else{
        $('#content').innerHTML='';
        $('#content').appendChild(new CustomerApp());
    }
})
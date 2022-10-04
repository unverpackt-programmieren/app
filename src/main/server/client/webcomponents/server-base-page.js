require("./../../../app/www/js/utils/queryDOMElements");
const superagent = require("superagent");
const Cookies = require("js-cookie");
const nunjucks = require("nunjucks");
const i18n = require("./../i18n");

class ServerBasePage extends HTMLElement {

    templateSelector(){
        return undefined;
    }

    render(target, data){
        if(!this.templateSelector()){
            return;
        }
        const template = $(this.templateSelector()).textContent;
        target.innerHTML= nunjucks.renderString(template, data);
        this.attachI18n(target);
    }

    attachI18n(target){
        const attributeFilter = attr=>attr.name.indexOf('i18n-')==0;
        const withI18n=$$('*',target).filter(n=> Array.from(n.attributes).filter(attributeFilter).length>0);
        withI18n.forEach(nodeWithI18n=>{
            Array.from(nodeWithI18n.attributes).filter(attributeFilter).forEach(i18nAttribute=>{
                const command = i18nAttribute.name.split('-')[1];
                const languageKey = navigator.language !='de' ? 'en' : navigator.language;
                const value = i18n.parse(languageKey, i18nAttribute.value);
                if(command==='value'){
                    nodeWithI18n.innerText = value;
                }
                if(command==='title'){
                    nodeWithI18n.title = value;
                }
            })
        })
    }

    async get(url) {
        try {
            const rsp = await superagent.get(url);
            return rsp.body;
        } catch (err) {
            Cookies.remove('token');
            location.reload();
        }
    }
}
module.exports=ServerBasePage;
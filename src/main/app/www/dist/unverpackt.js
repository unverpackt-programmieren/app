(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.unverpacktProgrammieren = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const i18n = {
    de: require("./i18n/de")
}
module.exports = {
    i18n: i18n,
    language: 'de',
    db:{
        name: 'my.db',
        location: 'default',
        androidDatabaseProvider: 'system'
    },
    pages: {
        Search: require("./../webcomponents/pages/search-page"),
        Favourites: require("./../webcomponents/pages/favourites-page"),
        Settings: require("./../webcomponents/pages/settings-page")
    }
}
},{"./../webcomponents/pages/favourites-page":10,"./../webcomponents/pages/search-page":11,"./../webcomponents/pages/settings-page":12,"./i18n/de":2}],2:[function(require,module,exports){
module.exports = {
    name: 'unverpackt programmieren',
    bottom: {
        search: 'Suche',
        favourites: 'Favoriten',
        settings: 'Einstellungen'
    }
}
},{}],3:[function(require,module,exports){
(function (global){(function (){
const queryDomElements = require("./utils/queryDOMElements");
global.AppFrame = require("./webcomponents/app-frame");
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils/queryDOMElements":5,"./webcomponents/app-frame":7}],4:[function(require,module,exports){
const ProxyFactoryCommands = {
    create: (target, propKey) => {
        return () => {
            const node = document.createElement(target.tag);
            const typeOfHtml = typeof target.html;
            if (typeOfHtml !== 'undefined') {
                if (typeOfHtml === 'string') {
                    node.innerHTML = target.html;
                } else if (typeOfHtml === 'object') {
                    if (Array.isArray(target.html)) {
                        target.html.forEach(child => {
                            try {
                                node.appendChild(child);
                            } catch (err) {
                                console.log(err);
                                console.log(node);
                                console.log(child);
                            }
                        })
                    } else {
                        node.appendChild(target.html);
                    }
                }
            }
            Object.keys(target.attributes).forEach(attr => {
                node.setAttribute(attr, target.attributes[attr].join(' '))
            })

            Object.keys(target.listener).forEach(event => {
                target.listener[event].forEach(listener => {
                    node.addEventListener(event, listener);
                })
            })

            return node;
        }
    }
}

const innerAttributeHandler = {
    get(target, propKey, receiver) {
        const command = ProxyFactoryCommands[propKey];
        const receiveAttribute = function (...args) {
            if (propKey == 'on') {
                const event = args[0];
                const listener = args[1];
                if (!target.listener[event]) {
                    target.listener[event] = [];
                }
                target.listener[event].push(listener);
            } else {
                if (!target.attributes[propKey]) {
                    target.attributes[propKey] = [];
                }
                args.forEach(arg => {
                    target.attributes[propKey].push(arg);
                })
            }
            return receiver;
        };
        if (!command) {
            return receiveAttribute;
        } else {
            return ProxyFactoryCommands[propKey](target, propKey, receiver);
        }
    }
}

class DOMNodeFactory {
    constructor(tag, innerHTML) {
        this.tag = tag;
        this.attributes = {};
        this.listener = {};
        this.html = innerHTML;
    }
}

const initHandler = {
    get(target, propKey, receiver) {
        return function (...args) {
            const isCustom = propKey == 'wc';
            const node = new Proxy(new DOMNodeFactory(isCustom ? args[0] : propKey, isCustom ? undefined : args[0]), innerAttributeHandler);
            return node;
        };
    }
};

const factory = new Proxy({}, initHandler);
module.exports = factory;
},{}],5:[function(require,module,exports){
(function (global){(function (){
const queryMultipleDOMNodes = (selector, node) => {
    const searchIn = !node ? document : node;
    return Array.from(searchIn.querySelectorAll(selector));
};

const querySingleDOMNode = (selector, node) => {
    const searchIn = !node ? document : node;
    return searchIn.querySelector(selector);
};

if (typeof module !== 'undefined') {
    module.exports = {
        $:querySingleDOMNode,
        $$:queryMultipleDOMNodes
    };
    global.$ = querySingleDOMNode;
    global.$$ = queryMultipleDOMNodes;
}else{
    var root = global;
    root.$ = querySingleDOMNode;
    root.$$ = queryMultipleDOMNodes;
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
const config = require("./../config/config");
module.exports = (sqlQuery, values) => {
    return new Promise((resolve, reject) => {
        const db = window.sqlitePlugin.openDatabase(config.db);
        db.transaction(function (tx) {
            tx.executeSql(sqlQuery, values, function (tx, rs) {
                const value = rs.rows.item(0);
                resolve({
                    rs:rs
                });
            }, function (tx, error) {
                reject(error);
            });
        });
    })
}
},{"./../config/config":1}],7:[function(require,module,exports){
const config = require("./../config/config");
const TopBar = require("./top-bar");
const BottomBar = require("./bottom-bar");
const dom = require("./../utils/dom");
const sql = require("./../utils/webSQL");

class AppFrame extends HTMLElement {
    async prepareDB() {
        const createProfile = await sql("CREATE TABLE IF NOT EXISTS Profile (lastQuery)");
        const existsProfile = await sql("SELECT count(lastQuery) FROM Profile");
        return true;
    }

    connectedCallback() {
        this.prepareDB().then(() => {
            this.pageContent = dom.div(new config.pages.Search()).class('content').create();
            const content = dom.div([
                new TopBar(),
                this.pageContent,
                new BottomBar()
            ]).create();
            this.appendChild(content);
        })
    }

    show(Component) {
        this.pageContent.innerHTML = '';
        this.pageContent.appendChild(new Component());
    }
}

window.customElements.define('app-frame', AppFrame);
module.exports = AppFrame;
},{"./../config/config":1,"./../utils/dom":4,"./../utils/webSQL":6,"./bottom-bar":8,"./top-bar":13}],8:[function(require,module,exports){
const config = require("./../config/config");
const dom = require("./../utils/dom");
const NavigationButton = require("./navigation-button");

class BottomBar extends HTMLElement {
    connectedCallback() {
        const language = config.language;
        const searchButton = new NavigationButton();
        searchButton.init(config.i18n[language].bottom.search, config.pages.Search);
        const favouritesButton = new NavigationButton();
        favouritesButton.init(config.i18n[language].bottom.favourites, config.pages.Favourites);
        const settingsButton = new NavigationButton();
        settingsButton.init(config.i18n[language].bottom.settings, config.pages.Settings);
        const content = dom.div([
            searchButton, favouritesButton, settingsButton
        ]).create();
        this.appendChild(content);
    }
}

window.customElements.define('bottom-bar', BottomBar);
module.exports = BottomBar;
},{"./../config/config":1,"./../utils/dom":4,"./navigation-button":9}],9:[function(require,module,exports){
const dom = require("./../utils/dom");

class NavigationButton extends HTMLElement {
    init(title, componentToLoad) {
        const button = dom.button(title).create();
        this.appendChild(button);
        this.addEventListener('click', () => {
            $('app-frame').show(componentToLoad);
        })
    }
}

window.customElements.define('navigation-button', NavigationButton);
module.exports = NavigationButton;
},{"./../utils/dom":4}],10:[function(require,module,exports){
class FavouritesPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 'Ich bin die Favoriten';
    }
}

window.customElements.define('favourites-page', FavouritesPage);
module.exports = FavouritesPage;
},{}],11:[function(require,module,exports){
const dom = require("./../../utils/dom");
const config = require("./../../config/config");

class SearchPage extends HTMLElement {
    connectedCallback() {
        const query = dom.input().type('text').create();
        this.appendChild(query);
        query.addEventListener('keyup', () => {
            console.log(query.value);
        })
    }
}

window.customElements.define('search-page', SearchPage);
module.exports = SearchPage;
},{"./../../config/config":1,"./../../utils/dom":4}],12:[function(require,module,exports){
class SettingsPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 'Ich bin die Einstellungsseite';
    }
}

window.customElements.define('settings-page', SettingsPage);
module.exports = SettingsPage;
},{}],13:[function(require,module,exports){
const config = require("./../config/config");
const dom = require("./../utils/dom");

class TopBar extends HTMLElement {
    connectedCallback() {
        const language = config.language;
        const content = dom.div(
            dom.h2(config.i18n[language].name).create()
        ).create();
        this.appendChild(content);
    }
}

window.customElements.define('top-bar', TopBar);
module.exports = TopBar;
},{"./../config/config":1,"./../utils/dom":4}]},{},[3])(3)
});

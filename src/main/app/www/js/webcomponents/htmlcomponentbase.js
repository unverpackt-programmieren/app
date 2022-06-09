const superagent = require("superagent");

class HTMLComponentBase extends HTMLElement {

    constructor(args) {
        super();
        this.args = args;
    }

    get config() {
        return require("./../config/config");
    }

    get dom() {
        return require("./../utils/dom");
    }

    /**
     * Sucht im für den Benutzer passenden i18n nach punkt getrenntem Pfad.
     * @param i18nPath
     */
    safe_i18n(i18nPath, fixedLanguageKey) {
        const errormsg = "LANG ERROR";
        let languageKey = !fixedLanguageKey ? this.config.user.language : fixedLanguageKey;
        if (!this.config.i18n[languageKey]) {
            console.error(`there is no language ${languageKey} -> using fallback (${this.config.language})`);
            languageKey = this.config.language;
        }
        const result = i18nPath.split('.').reduce((gesamt, aktuell) => {
            return gesamt !== undefined ? gesamt[aktuell] : undefined;
        }, this.config.i18n[languageKey])
        if (!result) {
            console.error(`there is no language property for ${i18nPath} in language ${languageKey}`)
            return errormsg;
        }
        return result;
    }

    appendChildren() {
        var expandedArgs = arguments;
        var need2expand = true;
        while (need2expand) {
            need2expand = false;
            var temp = [];

            for (var i = 0; i < expandedArgs.length; i++) {
                if (Array.isArray(expandedArgs[i])) {
                    need2expand = true;

                    for (var j = 0; j < expandedArgs[i].length; j++) {
                        temp.push(expandedArgs[i][j]);
                    }
                } else {
                    temp.push(expandedArgs[i]);
                }
            }

            expandedArgs = temp;
        }

        this.appendChildrenNoExp(expandedArgs);
    }

    //appendChildrenNoExpand
    appendChildrenNoExp() {
        var children = [];
        if (arguments.length == 1 && Array.isArray(arguments[0])) {
            children = arguments[0];
        } else {
            children = Array.from(arguments);
        }

        for (var i = 0; i < children.length; i++) {
            this.appendChild(children[i]);
        }
    }

    get db() {
        return {
            serverAdress: "http://127.0.0.1:3000",
            get: (id, path, onlyFirst = false) => {
                if (!id) {
                    id = 1;
                }

                return new Promise((resolve, reject) => {
                    superagent.get(this.db.serverAdress + String(path) + String(id)).then((result) => {
                        resolve(onlyFirst ? result.body[0] : result.body);
                    }).catch((error) => {
                        reject(error);
                    });
                });
            },
            getProduct: (id) => {
                return this.db.get(id, "/products/id/", true);
            },
            getVendor: (id) => {
                return this.db.get(id, "/vendor/", true);
            },
            getCategory: (id) => {
                return this.db.get(id, "/category/", true);
            },
            products: {
                ofCategory: (categoryId) => {
                    return this.db.get(categoryId, "/products/category/");
                },
                ofVendor: (providerId) => {
                    return this.db.get(providerId, "/products/vendor/");
                },
                withId: (id) => {
                    console.log("HTMLComponentBase.db.products.withId(id) -> use HTMLComponentBase.db.getProduct(id) instead");
                    return this.db.getProduct(id);
                }
            }
        };
    }
}

module.exports = HTMLComponentBase;
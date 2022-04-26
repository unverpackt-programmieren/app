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
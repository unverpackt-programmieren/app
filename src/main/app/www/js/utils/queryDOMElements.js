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

const i18n = {
    de: require("./i18n/de")
}
module.exports = {
    i18n: i18n,
    language: 'de',
    pages: {
        Search: require("./../webcomponents/pages/search-page"),
        Favourites: require("./../webcomponents/pages/favourites-page"),
        Settings: require("./../webcomponents/pages/settings-page")
    }
}
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
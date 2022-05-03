const i18n = {
    de: require("./i18n/de"),
    en: require("./i18n/en")
}
module.exports = {
    i18n: i18n,
    language: 'en',
    db:{
        name: 'my.db',
        location: 'default',
        androidDatabaseProvider: 'system'
    },
    pages: {
        Search: require("./../webcomponents/pages/search-page"),
        Favourites: require("./../webcomponents/pages/favourites-page"),
        Settings: require("./../webcomponents/pages/settings-page"),
        Impressum: require("./../webcomponents/pages/impressum-page")
    }
}
const DefaultTop = require("./../webcomponents/top-bar");
const DefaultBottom = require("./../webcomponents/bottom-bar");
const SettingsTop = require("./../webcomponents/settings-topbar");

const i18n = {
    de: require("./i18n/de"),
    en: require("./i18n/en"),
    sk: require("./i18n/sk")
}
module.exports = {
    i18n: i18n,
    language: 'en', //fallback language, for user language go to usersettings.js
    user: require("./userconfig"),
    defaultpage: "Search",
    db:{
        name: 'my.db',
        location: 'default',
        androidDatabaseProvider: 'system'
    },
    pages: {
        Search: {
            content : require("./../webcomponents/pages/search-page"),
            top: DefaultTop,
            bottom: DefaultBottom
        },
        Favourites: {
            content : require("./../webcomponents/pages/favourites-page"),
            top: DefaultTop,
            bottom: DefaultBottom
        },
        Settings: {
            content : require("./../webcomponents/pages/settings-page"),
            top: SettingsTop,
            bottom: DefaultBottom
        },
        Impressum: {
            content : require("./../webcomponents/pages/impressum-page"),
            top: DefaultTop,
            bottom: DefaultBottom
        }
    }
}
const i18n = {
    parse:(language,paths)=>{
        let result = i18n[language];
        paths.split('.').forEach(path=>{
            result = result[path];
        })
        return result;
    },
    de:{
        sidebar:{
            overview:{
                value:'Übersicht'
            },
            settings:{
                value:'Einstellungen'
            },
            products:{
                value:'Produkte'
            }
        },
        customerData:{
            ansprechpartner: 'Ansprechpartner',
            name:{
                value:'Name'
            },
            telefon:{
                value:'Telefon'
            },
            mail:{
                value:'E-Mail'
            },
            oeffnungszeiten:{
                value:'Öffnungszeiten'
            },
            beginn:{
                value:'von'
            },
            ende:{
                value:'bis'
            },
            homepage:{
                value:'Webseite'
            },
            beschreibung:{
                value:'Beschreibung'
            },
            reservierbar:{
                value:'Reservierbar'
            },
            chat:{
                value:'Chat erreichbar'
            },
            adresse: {
                value: 'Adresse',
                title: 'Hier bitte die Anschrift eingeben'
            }
        }
    },
    en:{
        customerData:{
            ansprechpartner: 'Contact',
            adresse: {
                title: 'Adresse',
                tooltip: 'Hier bitte die Anschrift eingeben'
            }
        }
    }
}
module.exports = i18n;
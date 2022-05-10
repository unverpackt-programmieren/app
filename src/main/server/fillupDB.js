const {faker} = require('@faker-js/faker');
const storage = require("./db/storage");

const between = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomTime = (beforeTime) => {
    const hours = ["00", "15", "30", "45"];
    let begin = (!beforeTime ? between(6, 12) : between(12, 22)) + "";
    if (begin.length === 1) {
        begin = "0" + begin;
    }
    return begin + ':' + hours[between(0, hours.length - 1)]
}

const createCustomer = async hasOptionalFields => {
    const customer = await storage.Kunde.create({
        name: faker.company.companyName(),
        ansprechpartner: faker.name.firstName() + ' ' + faker.name.lastName(),
        adresse: faker.address.streetAddress(),
        telefon: faker.phone.phoneNumber(),
        mail: hasOptionalFields ? faker.internet.email() : undefined,
        oeffnungszeitBeginn: hasOptionalFields ? randomTime() : undefined,
        oeffnungszeitEnde: hasOptionalFields ? randomTime(true) : undefined,
        logo: hasOptionalFields ? faker.image.avatar() : undefined,
        homepage: hasOptionalFields ? faker.internet.url() : undefined,
        beschreibung: hasOptionalFields ? faker.lorem.lines(between(3, 12)) : undefined,
        reservierbar: between(1, 20) % 2 == 0,
        chat: between(1, 20) % 2 == 0,
    })
    return customer
}

const createProduct = async (customerId, createCategory) => {
    let categoryId;
    if (createCategory) {
        let categoryExists = true;
        let categoryTitle = faker.commerce.product();
        let counter = 0;
        while (categoryExists) {
            const result = await storage.Kategorie.findOne({where: {titel: categoryTitle}})
            if (result === null) {
                categoryExists = false;
            } else {
                categoryTitle = faker.commerce.product();
                counter++;
            }
            if (counter == 10) {
                return createProduct(customerId, false);
            }
        }
        const category = await storage.Kategorie.create({
            titel: categoryTitle
        })
        categoryId = category.id;
    } else {
        const categories = await storage.Kategorie.findAll();
        categoryId = categories[between(0, categories.length - 1)].dataValues.id
    }
    const product = await storage.Produkt.create({
        beschreibung: faker.company.catchPhrase(),
        logo: faker.image.avatar(),
        preis: faker.commerce.price(1, 20, 2),
        reservierbar: between(0, 10) % 2 === 0,
        CustomerId: customerId,
        CategoryId: categoryId
    })
    return product;
}

const fillup = async () => {
    await storage.db.sync({force: true});
    for (let i = 0; i < between(30, 100); i++) {
        const customer = await createCustomer(i % 2 === 0);
        console.log('Kunde ' + customer.name + ' hat folgende Produkte:')
        for (let j = 0; j < between(2, 10); j++) {
            let createCategory = between(1, 10) % 2 === 0;
            if (i === 0) {
                createCategory = true;
            }
            const product = await createProduct(customer.id, i % 2 === 0);
            const found = await storage.Produkt.findOne({where: {id: product.id}, include: {model: storage.Kategorie}})
            console.log('- ' + found.Category.dataValues.titel + ' ' + found.dataValues.beschreibung + ' für ' + found.dataValues.preis)
        }
    }
}

fillup().then(() => {
    console.log('DB is filled up')
})
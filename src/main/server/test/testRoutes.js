require("chai").should();
const chai = require("chai");
const superagent = require("superagent")
const underTest = require('./../server');

const storage = require("./../db/storage")

describe("routen vom server", () => {
    let server;
    let app;
    before(async () => {
        const started = await underTest();
        server = started.server;
        app = started.app;
    })

    it("/category/*", async () => {
        const categoriesFromDB = await storage.Kategorie.findAll();
        const firstCategory = categoriesFromDB[0].dataValues;
        const rsp = await superagent.get("http://localhost:3000/category/" + firstCategory.id);
        rsp.body[0].titel.should.equal(firstCategory.titel);
    })

    it("/vendor/*", async () => {
        const kundenFromDB = await storage.Kunde.findAll();
        const firstKunde = kundenFromDB[0].dataValues;
        const rsp = await superagent.get("http://localhost:3000/vendor/" + firstKunde.id);
        rsp.body[0].name.should.equal(firstKunde.name);
        rsp.body[0].ansprechpartner.should.equal(firstKunde.ansprechpartner);
    })

    it("/products/*", async () => {
        const produkteFromDB = await storage.Produkt.findAll();
        const firstProdukt = produkteFromDB[0].dataValues;
        let rsp = await superagent.get("http://localhost:3000/products/id/" + firstProdukt.id);
        rsp.body[0].logo.should.equal(firstProdukt.logo);
        const productsFromCategory = await storage.Produkt.findAll({
            where:{
                CategoryId: firstProdukt.CategoryId
            }
        })
        rsp = await superagent.get("http://localhost:3000/products/category/" + firstProdukt.CategoryId);
        productsFromCategory.map(d=>d.dataValues.id).should.eql(rsp.body)

        const vendorsFromCategory = await storage.Produkt.findAll({
            where:{
                CustomerId: firstProdukt.CustomerId
            }
        })
        rsp = await superagent.get("http://localhost:3000/products/vendor/" + firstProdukt.CustomerId);
        vendorsFromCategory.map(d=>d.dataValues.id).should.eql(rsp.body)
    })

    it("/products/by/category/:categoryId", async ()=>{
        const productsFromCategory = await storage.Produkt.findAll({
            where:{
                CategoryId: 1
            }
        })

        let rsp = await superagent.get("http://localhost:3000/products/by/category/1");
        rsp.body[0].id.should.equal(productsFromCategory[0].id);
    })

    after(async () => {
        server.close();
    })

})


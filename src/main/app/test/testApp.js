require("chai").should();
const puppeteer = require("puppeteer");
const backend = require('./../../server/server');
const userconfig = require("./../www/js/config/userconfig")
const en = require("./../www/js/config/i18n/en")
let browser;
let page;
let childProcess;
describe("unverpackt programmieren app", ()=>{
    before((done) => {
        const lastLineOfCordova = "304 /plugins/cordova-sqlite-storage/www/SQLitePlugin.js";
        childProcess =  require('child_process').spawn('cordova' ,['run','browser']);
        childProcess.stdout.on('data', async data => {
            const strData = data.toString();
            if(strData.indexOf(lastLineOfCordova)===0){
                const started = await backend(4567);
                server = started.server;
                browser = await puppeteer.launch({headless:true});
                page = await browser.newPage();
                await page.goto("http://localhost:8000/index.html");
                done();
            }
        });
    })

    it("kann man mit navigieren tun", async()=>{
        await page.waitForSelector('navigation-button:nth-child(3)');
        await page.click('navigation-button:nth-child(3)');
        await page.waitForSelector('settings-page');
        await page.click('navigation-button:nth-child(2)');
        await page.waitForSelector('favourites-page');
        await page.click('navigation-button:nth-child(1)');
        await page.waitForSelector('search-page');
        await page.click('top-bar navigation-button');
        await page.waitForSelector('impressum-page');
    })

    it("kann einstellungen verändern", async()=>{
        await page.click('navigation-button:nth-child(3)');
        await page.waitForSelector('settings-page');
        const currentConfig = await page.evaluate(()=>{
            return {
                language: $('settings-page select').value,
                darkmode: $('.content > settings-page:nth-child(1) > div:nth-child(2) > input:nth-child(2)').checked,
                minimizeTraffic: $('.content > settings-page:nth-child(1) > div:nth-child(3) > input:nth-child(2)').checked,
            }
        })
        currentConfig.should.eql(userconfig);
        await page.$eval('settings-page select', select=> select.selectedIndex=1);
        await page.click('.content > settings-page:nth-child(1) > button:nth-child(4)');
        const labelSaveButton = await page.$eval('.content > settings-page:nth-child(1) > button:nth-child(4)', button=>button.textContent);
        labelSaveButton.should.equal(en.settings.saveButton);
    })

    after(async () => {
        childProcess.kill();
        server.close();
        browser.close();
    })
})
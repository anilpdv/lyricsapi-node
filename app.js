const express = require('express')
const xray = require('x-ray')
const puppeteer = require('puppeteer')


const x = xray()
const app = express()

app.get('/lyrics', async (req, res) => {
    const url = req.query.url
    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage()
    await page.goto(url)
    const result = page.$eval('div.col-xs-12.col-lg-8.text-center > div:nth-of-type(5)', el => el.textContent)
    res.send(result)
    browser.close()
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('started...', port)
})
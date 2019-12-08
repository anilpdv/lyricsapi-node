const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/lyrics', async (req, res) => {
  const url = req.query.url;
  console.log(url);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  await page.goto(url);
  const result = await page.$eval(
    'div.col-xs-12.col-lg-8.text-center > div:nth-of-type(5)',
    el => el.textContent,
  );
  res.send(result);
  browser.close();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('started...', port);
});

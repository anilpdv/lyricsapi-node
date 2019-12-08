const request = require('request');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

let ip_addresses = [];
let port_numbers = [];
let random_number = Math.floor(Math.random() * 100);

function proxyGenerator() {
  request('https://sslproxies.org/', function(error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $('td:nth-child(1)').each(function(index, value) {
        ip_addresses[index] = $(this).text();
      });

      $('td:nth-child(2)').each(function(index, value) {
        port_numbers[index] = $(this).text();
      });
    } else {
      console.log('Error loading proxy, please try again');
    }

    ip_addresses.join(', ');
    port_numbers.join(', ');
    let proxy = `http://${ip_addresses[random_number]}:${
      port_numbers[random_number]
    }`;

    return proxy;
  });
}

app.get('/lyrics', (req, res) => {
  const url = req.query.url;
  const options = {
    url: url,
    method: 'GET',
    proxy: proxyGenerator(),
  };
  request(options, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let article_headings = $(
        'div.col-xs-12.col-lg-8.text-center > div:nth-of-type(5)',
      ).text();
      res.send(article_headings);
    } else {
      console.log('Error scraping site, please try again');
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('started...', port);
});

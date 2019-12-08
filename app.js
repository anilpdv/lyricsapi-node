const express = require('express')
const xray = require('x-ray')

const x = xray()
const app = express()

app.get('/lyrics', (req, res) => {
    const url = req.query.url
    x(url, 'div.col-xs-12.col-lg-8.text-center > div:nth-of-type(5)')((err, data) => {
        console.log(data)
        res.json({
            "lyrics": data
        })
    })

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('started...', port)
})
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router').router;
const { startDB } = require('./models/index')
const app = express();

app.use(bodyParser.json()); // To read data in json format.

app.use(router);
module.exports = {
    app
}
if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Listening on port ${process.env.POST || 8000}`)
        startDB();
    })
}

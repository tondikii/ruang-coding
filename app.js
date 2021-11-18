const express = require('express');
const app = express();
const port = 3001;
const router = require('./routes');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', router);


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
const express = require('express');
const app = express();
const port = 3006;
const router = require('./routes');
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
    secret: 'RuangCoding',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, sameSite: true}  
}))

app.use('/', router);


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
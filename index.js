'use strict';

let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let exphbs = require('express-handlebars');
let PORT = process.env.PORT || 3030;
let session = require('express-session');
const flash = require('express-flash');
let greetingsModule = require('./services/GreetFactory');


let fullPage = {
    userData: {
        greeting: 'Hello World!'
    },
    counter: 0
}
// DB Setup

// let connectionString = process.env.DATABASE_URL || 'postgres://vusi:8423@192.168.0.38:5432/greetings';

const {
    Pool
} = require('pg');
const pool = new Pool({
    user: 'coder',
    host: '127.0.0.1',
    database: 'greetings',
    password: '8423',
    port: 5432
});
let greetings = greetingsModule(pool);


app.use(session({
    secret: '123'
}));

app.use(flash());

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Routes


app.get('/', async function (req, res) {
    fullPage.counter = await greetings.getCounter();
    res.render('home', fullPage);
});

app.post('/greet', async function (req, res) {

    if ((req.body.userEnteredName.length == 0) || (req.body.radioLang == undefined)) {
        req.flash('info', 'Please type in your name and choose a language first');
        res.redirect('/');

    } else {
        greetings.name(req.body.userEnteredName);
        greetings.language(req.body.radioLang);
        fullPage.userData.greeting = await greetings.greet();
        res.redirect('/');
    }

});


app.get('/greeted', async function (req, res) {
    let result = await greetings.greetedUsers('allUsers');
    res.render('greeted', {
        users: result
    });

});

app.get('/counter/:user', async function (req, res) {
    let userName = req.params.user;
    let result = await greetings.greetedUsers(userName);
    res.render('counter', result);
});

app.get('/admin', async function (req, res) {
    res.render('admin');
});


//FIRE TO THE SERVER  

app.listen(PORT, function () {
    console.log('greetings-webapp listening on port : ', PORT)
});
'use strict';

let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let exphbs = require('express-handlebars');
let PORT = process.env.PORT || 3030;
// let session = require('express-session');
const flash = require('express-flash');
let greetingsModule = require('./GreetFactory');


let fullPage = {
    userData: {
        greeting: 'Hello World!'
    },
    other: {
        counter: 0
    },
    greetedUsers: []
}
// DB Setup

// let connectionString = process.env.DATABASE_URL || 'postgres://vusi:8423@192.168.0.38:5432/greetings';

const {
    Pool
} = require('pg');
const pool = new Pool({
    user: 'vusi',
    host: '192.168.0.38',
    database: 'greetings',
    password: '8423',
    port: 5432
});
let greetings = greetingsModule(pool);


// app.use(session({
//     secret: '123'
// }));

// app.use(flash());

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
app.get('/', function (req, res) {
    res.render('home', fullPage);
});

app.get('/greeted', function (req, res) {

    greetings.greeted('allUsers').then((result) => {

            res.render('greeted', result);

        })
        .catch((err) => console.error(err))
});

app.get('/counter/:user', function (req, res) {
    let userName = req.params.user;

    greetings.greeted(userName).then((result) => {
            res.render('counter', result);
        })
        .catch((err) => console.error(err))
});

app.post('/greet', function (req, res) {
    greetings.name(req.body.userEnteredName);
    greetings.language(req.body.radioLang);
    greetings.greet();
    fullPage.userData.greeting = greetings.greetData.greeting;
    greetings.counter().then((result) => {
            fullPage.other.counter = result;
            fullPage.greetedUsers = greetings.namesGreeted;
            // res.render('home', result);
            res.redirect('/');
        })
        .catch((err) => console.error(err))
});

//FIRE TO THE SERVER  

app.listen(PORT, function () {
    console.log('greetings-webapp listening on port : ', PORT)
});

//
'use strict';

let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let exphbs = require('express-handlebars');
let PORT = process.env.PORT || 3001;
// let session = require('express-session');
const flash = require('express-flash');
let greetingsModule = require('./GreetFactory');
let greetings = greetingsModule();

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

let connectionString = process.env.DATABASE_URL || 'postgres://coder:8423@127.0.0.1:5432/greetings';

const {
    Client
} = require('pg');

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

// add to fullpage the object with the counter info
// and connect to handlebars


// app.get('/counter', function (req, res) {
//     res.render('counter', fullPage);

//     // let userName = req.params.greetName;
//     // res.send('you are : ' + userName);


// });

app.get('/greeted', function (req, res) {
    const client = new Client({
        connectionString: connectionString,
    });
    client.connect()
        .then(() => {
            const sql = 'SELECT name FROM USERS';
            return client.query(sql);
        })
        .then((result) => {
            fullPage.greetedUsers = result.rows;
            res.render('greeted', fullPage);

            console.log(result);
        });

    //  = greetings.namesGreeted;
});

app.get('/counter/:user', function (req, res) {
    let userName = req.params.user;
    let userCountData = greetings.userSpecCounter(userName);
    fullPage.greetedUsers = userCountData;
    res.render('counter', fullPage);
});

app.post('/greet', function (req, res) {
    const client = new Client({
        connectionString: connectionString,
    });
    client.connect()
        .then(() => {
            console.log('connected to database successfully');

            //query here
            const sql = 'INSERT INTO users(name) VALUES ($1)';
            const params = [req.body.userEnteredName];
            return client.query(sql, params);
        })



        .then((result) => {

            console.log('results :', result.rows);
        });
    // .then(() => {

    // })

    greetings.name(req.body.userEnteredName);
    greetings.language(req.body.radioLang);
    fullPage.userData.greeting = greetings.greet();
    fullPage.other.counter = greetings.namesGreeted.length;

    fullPage.greetedUsers = greetings.namesGreeted;

    res.redirect('/');


    // if (req.body.userEnteredName == '') {
    //     req.flash('info', 'Please type in your name and select a lanuage first');
    // } else {
    //     fullPage.other.counter++;
    //     res.redirect('/');
    // }

});

//FIRE TO THE SERVER  

app.listen(PORT, function () {
    console.log('greetings-webapp listening on port : ', PORT)
});
// DECLARATIONS
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let exphbs = require('express-handlebars');
let PORT = process.env.PORT || 3001;
let GreetingsFactory = require('./GreetFactory');
let greetings = GreetingsFactory();

let fullPage = {
    userData: {
        greeting: 'Hello World!'
    },
    other: {
        counter: 0
    }
}


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
// Get Routes
app.get('/', function (req, res) {
    res.render('home', fullPage);
});

app.get('', function (req, res) {
    let userName = req.params.greetName;
    res.send('you are : ' + userName);


});

app.post('/greet', function (req, res) {
    // let nameFromForm = ;
    // let radioLangSelected = ;
    let greetData = {
        name: req.body.userEnteredName,
        lang: req.body.radioLang
    };
    fullPage.userData.greeting = greetings.greetNow(greetData);
    fullPage.other.counter++;
    res.redirect('/');
});





//SERVER FIRE 
const server = app.listen(process.env.PORT || 3000);
app.listen(PORT, function () {
    console.log('starting greetings-webapp on port : ', PORT)
});
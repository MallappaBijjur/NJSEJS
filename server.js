const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname+ '/views/partials');
hbs.registerHelper('getYear', () => new Date().getFullYear());

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    const now = new Date().toString();
    const toLog = `Time now is ${now} method to hit ${req.method} and path is ${req.path}`;
    console.log(toLog);
    fs.appendFile('server.log',toLog + '\n', (err) => {
        if(err) console.log(err)
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('mantain.hbs')
// });

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Title',
        content: 'Home Content'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Custom Title',
        content: 'Page Content'
    });
});

app.listen(4000, () => console.log('App is starting at 3000'));

const express =  require('express');
const app = express();
const nocache = require('nocache');
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');

const router = require('./router');

const PORT = process.env.PORT || 3001;

app.use(express.static("public"))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'ejs');


app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized: true,
}));

app.use('/route', router);
app.use(nocache())
// Home Route
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/route/dashboard');
    } else {
        res.render('login', { title: "QuantumLeapAI :Login Page", user: req.session.user || undefined });
    }
});

app.get ('*', (req, res) => {
    res.send('error')
})

app.listen(PORT ,() => {
    console.log(`Listening to the Server http://localhost:${PORT}`)
});
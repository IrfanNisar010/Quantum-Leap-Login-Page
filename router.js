var express = require("express");
var router = express.Router();

router.use(express.json());

const credentials = [
    { email: "admin@gmail.com", password: "admin123" },
    { email: "user1@gmail.com", password: "user123" },
    { email: "irfan@gmail.com", password: "irfan123" },
];
//login post route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const validUser = credentials.find(cred => cred.email === email && cred.password === password);

    if (validUser) {
        req.session.user = email;
    
        res.setHeader('Cache-Control', 'no-store, max-age=0');
    
        // Use HTTP 303 See Other status code for redirect
        res.status(303).redirect('/route/dashboard');
    } else {
        res.render('login', { title: "QuantumLeapAI", incorrect: "Incorrect Email or Password" });
    }
});    
//dashboard route
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user });
    } else {
        res.render('login', { title: "QuantumLeapAI", unauthorize: "Unauthorized User" });
    }
});
//logout route
router.get('/logout', (req, res) => {
    req.session.destroy(function(err){
        if(err) {
            console.log(err);
            res.send("Error");
            res.redirect('/');
        } else {
            res.render('login', { title: "QuantumLeapAI", logout: "Logout Successful" });
        }
    });
});

module.exports = router;

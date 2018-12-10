var express = require('express');
var router = express.Router();
var path = require('path');
var Aural = require('../Aural/aural');
var auth = require('../src/auth.js');


console.log(auth);


var db = new Aural('userdb', './db/userdb.json')
// db.init()
// const findUser = ()

router.get('/', (req, res, next) => {
    res.render('register', {})

})

router.post('/', (req, res, next) => {
    var user = req.body;
    var upload = {
            name: user.name,
            email: user.email,
            gender: user.gender,
            info: user.info
        }
    console.log(upload);
    db.addEntry(upload);
    db.listEntries();
    res.render('landing', {
        name: user.name,
        email: user.email,
        gender: user.gender,
        info: user.info
    })
})


// module.exports = router;
module.exports = router;

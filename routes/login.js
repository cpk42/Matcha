const express = require('express');
const router = express.Router();
const auth = require('../src/auth.js');
const Aural = require('../src/Aural/aural');
const db = new Aural('userdb', './public/db/userdb.json')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {});
});

router.post('landing', function(req, res, next) {
    if (auth.checkPasswd(req.body.email, req.body.password)) {
        var data = db.getAll().entries
        var user;

        for (var i = 0; data[i]; i++)
            if (data[i].email == req.body.email)
                user = data[i]
        console.log(user);
        res.render('landing', { user })
    } else {
        console.log('here');
        res.render('error', {});
    }
});

module.exports = router;

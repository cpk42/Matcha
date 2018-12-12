var Aural = require('../src/Aural/aural');
var auth = require('../src/auth.js');
var express = require('express');
var router = express.Router();
var path = require('path');

var db = new Aural('userdb', './public/db/userdb.json')
db.init()

router.get('/', (req, res, next) => {
    res.render('register', {})
})

router.post('/', (req, res, next) => {
    var user = req.body;
    var upload = Object.assign({
        name: user.name,
        email: user.email,
        gender: user.gender,
        info: user.info,
        pic: user.pic
    }, upload);
    if (req.body.email && req.body.password && !req.body.name) {
        upload = handleLogin(req.body.email, req.body.password);
        if (upload.email) {
            res.render('landing', {
                upload
            })
        } else {
            res.render('error', {
                msg: 'Incorrect login'
            })
        }
    } else {
        var check = handleRegister(user, upload);
        if (check) {
            res.render('landing', {
                upload
            })
        } else {
            res.render('error', {
                msg: 'User exists'
            })
        }
    }
})

var handleRegister = (user, upload) => {
    if (!auth.handleLogin({
            user_id: user.email,
            token: user.password
        })) {
        return (false)
    } else {
        db.addEntry(upload);
        return (true);
    }
}

var handleLogin = (email, password) => {
    var upload = {
        name: '',
        email: '',
        gender: '',
        info: '',
        pic: ''
    }
    if (auth.checkPasswd(email, password)) {
        var user
        var data = db.getAll().entries
        for (var i = 0; data[i]; i++)
            if (data[i].email == email) {
                upload.name = data[i].name;
                upload.email = data[i].email;
                upload.gender = data[i].gender;
                upload.info = data[i].info;
                upload.pic = data[i].pic
            }
        console.log(upload);
        return (upload)
    }
    return (upload);
}
// module.exports = router;
module.exports = router;

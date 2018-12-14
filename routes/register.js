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
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        gender: user.gender,
        preferences: user.preferences,
        info: user.info,
        profilePic: user.profilePic,
        tags: [],
        images: [],
        seen: [],
        likes: [],
        fame: 0,
        location: ''

    }, upload);
    console.log(upload);
    if (req.body.email && req.body.password && !req.body.gender) {
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
        fname: '',
        lname: '',
        email: '',
        gender: '',
        preferences: '',
        info: '',
        profilePic: '',
        tags: [],
        images: [],
        seen: [],
        likes: [],
        fame: 0,
        location: ''
    }
    if (auth.checkPasswd(email, password)) {
        var user
        var data = db.getAll().entries
        for (var i = 0; data[i]; i++)
            if (data[i].email == email) {
                upload.fname = data[i].fname;
                upload.lname = data[i].lname;
                upload.email = data[i].email;
                upload.gender = data[i].gender;
                upload.preferences = data[i].preferences,
                upload.info = data[i].info;
                upload.profilePic = data[i].profilePic;
                upload.tags = data[i].tags;
                upload.images = data[i].images;
                upload.seen = data[i].seen;
                upload.likes = data[i].likes;
                upload.fame = data[i].fame;
                upload.location = data[i].location;
            }
        // console.log(upload);
        return (upload)
    }
    return (upload);
}

module.exports = router;

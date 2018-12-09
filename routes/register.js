var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('register', {})
})

router.post('/', (req, res, next) => {
    res.render('landing', { name: req.body.name, email: req.body.email, password: req.body.password })
})


module.exports = router;

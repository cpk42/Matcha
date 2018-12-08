var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage', { title: 'Matcha' });
});

router.get('/register', (req, res, next) => {
    res.render('index', {})
})
// router.get('/register', (req, res, next) => {
//     res.render('register', { title: 'wow' })
//     console.log('here');
// })
//
// router.post('/register', (req, res, next) => {
//     res.render('register', { name: req.body.name, email: req.body.email, password: req.body.password })
//     console.log(req.body);
// })
//
// router.get('/register', (req, res, next) => {
//     res.render('register', { title: 'wow' })
//     console.log('here');
// })

module.exports = router;

const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();

//Include router paths to be set later
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

// view engine setup
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set routes here
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/sanitize', registerRouter);
app.use('/login', loginRouter);
app.use('/check', loginRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = {
    app: app
};


//Initilaize MongoDB
// require('dotenv').config();
// var mongojs = require('mongojs')
// const MongoClient = require('mongodb').MongoClient;
// const uri = process.env.MONGO_DB;
//
//

// var db = mongojs(uri, ['MatchaDB'])
// console.log(db);
// // var mycollection = db.collection('users')
// db.users.find(function (err, docs) {
//     console.log(docs);
// 	// docs is an array of all the documents in mycollection
// })
// var db;
//
// MongoClient.connect(uri, (err, client) => {
//     if (err)
//         console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
//     console.log('Connected...');
//     db = client.db('MatchaDB')
//     db.collection('users').insertOne({
//         Name: "Curtis"
//     })
//     // perform actions on the collection object
//     db.collection('users').find().toArray((err, results) => {
//         console.log(results)
//         // send HTML file populated with quotes here
//     })
//     // client.close();
// });
// console.log(db);

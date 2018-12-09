const cookieParser = require('cookie-parser');
const createError = require('http-errors');
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const usersRouter = require('./routes/users');


const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB;

// replace the uri string with your connection string.
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("MatchaDB").collection("users");
   console.log(collection.users);
   // perform actions on the collection object
   client.close();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/sanitize', registerRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

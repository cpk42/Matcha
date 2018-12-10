var mongodb = require('mongodb');

module.exports.init = function (callback) {
  var server = new mongodb.Server("127.0.0.1", 27017, {});
  new mongodb.Db('test', server, {w: 1}).open(function (error, client) {
    //export the client and maybe some collections as a shortcut
    module.exports.client = client;
    module.exports.myCollection = new mongodb.Collection(client, 'myCollection');
    callback(error);
  });
};

//Initilaize MongoDB
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB;
var db;

MongoClient.connect(uri, (err, client) => {
    if (err)
        console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
    console.log('Connected...');
    db = client.db('MatchaDB')

    // db.collection('users').insertOne({
    //     Name: "Curtis"
    // })
    // // perform actions on the collection object
    // db.collection('users').find().toArray((err, results) => {
    //     console.log(results)
    //     // send HTML file populated with quotes here
    // })
    client.close();
});
// //Initilaize MongoDB
// const MongoClient = require('mongodb').MongoClient;
// const uri = process.env.MONGO_DB;
// var db;
//
// MongoClient.connect(uri, (err, client) => {
//     if (err)
//         console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
//     console.log('Connected...');
//     db = client.db('MatchaDB')
//
//     // db.collection('users').insertOne({
//     //     Name: "Curtis"
//     // })
//     // // perform actions on the collection object
//     // db.collection('users').find().toArray((err, results) => {
//     //     console.log(results)
//     //     // send HTML file populated with quotes here
//     // })
//     client.close();
// });

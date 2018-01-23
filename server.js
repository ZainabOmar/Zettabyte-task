var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var UsersController = require('./users/userController.js');
var PhotoController = require('./photos/photoController.js')

//middleware
app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.json());

// Connect to Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/company');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

app.get('/api/users', UsersController.handleUsers.getUsers)

app.listen(process.env.PORT || 3000);
console.log('Running on port 3000...');

module.exports = app;
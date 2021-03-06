var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var UsersController = require('./users/userController.js');
var PhotoController = require('./photos/photoController.js')

//middleware
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

// Connect to Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/zettabyte');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

//users API's:
app.get('/api/users', UsersController.handleUsers.getUsers);
app.post('/api/users', UsersController.handleUsers.postUser);
app.get('/api/users/:id', UsersController.handleUsers.findOneUser);
app.put('/api/users/edit/:id', UsersController.handleUsers.editUser);
app.delete('/api/users/delete/:userId',UsersController.handleUsers.deleteUser);

//photos API's:
app.get('/api/photos', PhotoController.handlePhotos.getPhotos);
app.post('/api/photos', PhotoController.handlePhotos.postPhoto);
app.put('/api/photos/edit/:id', PhotoController.handlePhotos.editPhoto);
app.delete('/api/photos/delete/:photoId',PhotoController.handlePhotos.deletePhoto);

app.listen(process.env.PORT || 3000);
console.log('Running on port 3000...');

module.exports = app;
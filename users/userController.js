var jwt = require('jwt-simple');
var Q = require('q');
var User = require('../user/userModle.js')

module.exports.handleUsers = {
  // add user to data base
  postUser: function(req, res) {
    var user = {
      firstName: req.body.firstName;
      secondName: req.body.secondName;
      username: req.body.username;
      password: req.body.password;
      email: req.body.email;
      phoneNumber: req.body.phoneNumber;
      address: req.body.address;
    }

    // check to see if user already exists
    User.findOne({username: user.username})
    .exec(function (err, user) {
      if (user) {
        res.json('User already exist!');
      } else {
          // make a new user if not one
          return User.create(user, function (err, newUser) {
              // create token to send back for auth
              if(err){
                res.json(err);
              } else {
                var token = jwt.encode(newUser, 'secret');
                User.save(function(err, success){
                  if (err) throw err;
                  else{
                    res.json({token: token, user: newUser, success})
                  }
                })
              }   
            });
        }
      }) 
  },

  // get user in data base
  getUsers: function(req, res) {
    User.find({}, function(err, users){
      if(err){
        res.json(err);
      } else {
        res.json(users);
      }
    });
  }

}
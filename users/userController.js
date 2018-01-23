var jwt = require('jwt-simple');
var User = require('./userModule.js');
var Q = require('q');
var Company = require('../Company/companyModule.js')

module.exports.handleUsers = {
  // add user to data base
  signup: function(req, res) {

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    // check to see if user already exists
    User.findOne({username: username})
    .exec(function (err, user) {
      if (user) {
        res.json('User already exist!');
      } else {
          // make a new user if not one
          return User.create({
            username: username,
            password: password,
            email:email
          }, function (err, newUser) {
              // create token to send back for auth
              if(err){
                res.json(err);
              } else {
                var token = jwt.encode(user, 'secret');
                res.json({token: token, user: newUser}); 
              }     
            });
        }
      });

    // check to see if user already exists
    User.findOne({username: username})
    .exec(function (err, user) {
      if (user) {
        res.json('User already exist!');
      } else {
          // make a new user if not one
          Company.findOne({code:code})
          .exec(function(err,c) {
            if(err) throw err;
            if(c){
              return User.create({
                username: username,
                password: password,
                email:email
              }, function (err, newUser) {
              // create token to send back for auth
              if(err){
                res.json(err);
              } else {
                var token = jwt.encode(user, 'secret');
                c.users.push(newUser._id)
                c.save(function(err,c){
                  if(err) {throw err};
                  res.json({token : token ,_id : newUser._id , username : username})
                })
              }   
            });
            } else {
              res.status(404).json("wrong input");
            }
          }) 
        }
      });
  }
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
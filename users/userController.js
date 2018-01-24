var jwt = require('jwt-simple');
var Q = require('q');
var User = require('./userModle.js')

module.exports.handleUsers = {
  // add user to data base
  postUser: function(req, res) {
    var creatOne = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address
    }

    // check to see if user already exists
    User.findOne({username: creatOne.username})
    .exec(function (err, user) {
      if (user) {
        res.json('User already exist!');
      } else {
          // make a new user if not one
          return User.create(creatOne, function (err, newUser) {
              // create token to send back for auth
              if(err){
                res.json(err);
              } else {
                var token = jwt.encode(newUser, 'secret');
                res.json({token: token, user: newUser})
              }
            })
        }  
      });
  },

// get all users from database
getUsers: function(req, res) {
  User.find({}, function(err, users){
    if(err){
      res.json(err);
    } else {
      res.json(users);
    }
  });
},

//edit the user or update it:
editUser: function(req, res) {
  User.findById(req.params.id, function(err, user){
    if (err) throw err;
    else{
        //update it or leave it as it is if not:
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.username = req.body.username || user.username;
        user.password = req.body.password || user.password;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.address = req.body.address || user.address;
        //then save it to database again:
        user.save(function(err, updated){
          console.log(updated);
          if (err) throw err;
          else{
            res.json(updated);
          }
        })
      }
    })
},

//delete the user:
deleteUser : function(req,res){
 User.findByIdAndRemove(req.params.userId, function(err, user){
   if (err) {
    res.send("user not found");
  }
  else{
    res.status(200).send(user);
  }
});
},

findOneUser: function(req, res) {
  User.findById(req.params.id, function(err, user){
    if (err) throw err;
    else{
      res.json(user)
    }
  })
}

}
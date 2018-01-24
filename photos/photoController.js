var Photo = require('./photoModle.js');
var User = require('../users/userModle.js');

module.exports.handlePhotos = {
  // add photo to data base
  postPhoto: function(req, res) {
    var creatOne = {
      photoTitle: req.body.photoTitle,
      url: req.body.url
    }
    User.findOne({_id: req.body.userId})
    .then(function(user) {
      if (!user) {
       res.status(500).send("user not found")
     }else {
      Photo.create(creatOne, function(err, newPhoto){
        if(err){
         res.status(500).send("something went wrong");
       }else{
        user.photos.push(newPhoto);
        console.log("this is after pushing to user photos array", user)
        user.save(function(err, result) {
          if (err) {
           res.status(500).send("something went wrong");
         }else {
           res.json(result) 
         }
       })
      }
    })
    }
  })
  },

  // get all photos from database
  getPhotos: function(req, res) {
    Photo.find({}, function(err, photos){
      if(err){
        res.json(err);
      } else {
        res.json(photos);
      }
    });
  },

  editPhoto: function(req, res) {
    Photo.findById(req.params.id, function(err, photo){
      if (err) throw err;
      else{
        //update it or leave it as it is if not:
        photo.photoTitle = req.body.photoTitle || photo.photoTitle;
        photo.url = req.body.url || photo.url;
        //then save it to database again:
        photo.save(function(err, updated){
          console.log(updated);
          if (err) throw err;
          else{
            res.json(updated);
          }
        })
      }
    })
  },

  deletePhoto : function(req,res){
    Photo.findByIdAndRemove(req.params.photoId, function(err, photo){
     if (err) {
      res.send("photo not found");
    }
    else{
      res.status(200).send(photo);
    }
  });
  }

}
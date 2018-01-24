var Photo = require('./photoModle.js')

module.exports.handlePhotos = {
  // add photo to data base
  postPhoto: function(req, res) {
    var creatOne = {
      photoTitle: req.body.photoTitle,
      url: req.body.url
    }

    // check to see if photo already exists
    Photo.findOne({photoTitle: creatOne.photoTitle})
    .exec(function (err, photo) {
      if (photo) {
        res.json('Photo already exist!');
      } else {
          // make a new photo if not one
          return Photo.create(creatOne, function (err, newPhoto) {
            if(err){
              res.json(err);
            } else {
              res.json({photo: newPhoto})
            }
          })
        }  
      });
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
    Photo.findOne({_id: req.params.photoId})
    .then(function(photo) {
      if (!photo) {
       res.status(500).send("photo not found")
     }else {
       Photo.remove(photo, function (err) {
        if (err){
          res.json(err)
        } else{
          res.json(photo)
        };
      });
     }

   })
  }

}
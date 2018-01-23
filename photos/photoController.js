var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
  photoTitle:{
    type:String,
    required:true 
  },
  date:{
   type:String,
   required:true
 },
 type:{
   type:String,
   required:true 
 }
});

var photo = mongoose.model('photo', photoSchema);

module.exports = photo;
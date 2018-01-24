var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstName: {
   type:String,
   required:true 
 },
 lastName: {
   type:String,
   required:true 
 },
 username:{
  type:String,
  required:true 
},
password:{
 type:String,
 required:true
},
email:{
 type:String,
 required:true 
},
phoneNumber:{
 type:String,
 required:true
},
address:{
  type: String,
  required: false
},
photos:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'photo'
  }]
});

var user = mongoose.model('user', userSchema);

module.exports = user;
var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
	photoTitle:{
		type:String,
		required:true 
	},
	created_at: Date,
	updated_at: Date,
	type:{
		type:String,
		required:true 
	}
});

var photo = mongoose.model('photo', photoSchema);

module.exports = photo;
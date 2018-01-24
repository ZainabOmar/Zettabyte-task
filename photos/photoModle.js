var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
	photoTitle:{
		type:String,
		required:true 
	},
	url: {
		type:String,
		required:true
	},
	created_at: {
		type: Date, 
		required: true, 
		default: Date.now
	}
});

var photo = mongoose.model('photo', photoSchema);

module.exports = photo;
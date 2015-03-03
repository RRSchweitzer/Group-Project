var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var userSchema = new Schema({
	name: {
		givenName: {type: String},
		familyName: {type: String}
	},
	bio {type: String},
	bootcamp: {type: Schema.Types.ObjectId, ref: 'Bootcamp'},
	projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
	experience: {type: String, enum: ['Never coded','Begginer', 'Intermediate', 'Advanced']},

});

module.exports = Mongoose.model('User', userSchema);
var Express = require('express');
var Mongoose = require('mongoose');
var BodyParser = require('body-parser');
var Passport = require('passport');
var Session = require('express-session');
var request = require('request');
var GithubStrategy = require('passport-github').Strategy;


//Express
var port = 8888
var app = Express();

//Mongoose
var mongoUri = 'mongodb://localhost:27017/groupProject';
Mongoose.connect(mongoUri);
var db = Mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function() {
	console.log('connected to db at ' + mongoUri)
});

//middleware
app.use(Express.static(__dirname+'/Public'));
app.use(BodyParser.json());
app.use(Session({
	secret: 'JFDSF98hew98h8hDSOIFoiDiji3333'
}));
app.use(Passport.initialize());
app.use(Passport.session());

//passport cereal-lizers
Passport.serializeUser(function(user, done) {
  done(null, user);
});

Passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


//endpoints
// app.get('/api/user', userCtrl.getUser);
// app.get('/api/users', userCtrl.getUsers);

// app.get('/api/bootcamp', bootcampCtrl.getBootcamp);
// app.get('/api/bootcamps', bootcampCtrl.getBootcamps);


//Github Login
Passport.use(new GithubStrategy({
	clientID: '7711a028c6230935c259',
	clientSecret: '34062aa6e6f4711ca6822b0bb3240d06074dcafb',
	callbackURL: 'http://localhost:8888/auth/github/callback'
}, 
 function (token, refreshToken, profile, done) {
		return done(null, profile)
}));
// 	function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

//Passport endpoints
app.get('/auth/github',
	Passport.authenticate('github'))

app.get('/auth/github/callback',
	Passport.authenticate('github',
		{
			successRedirect: '/#/profilePage',
			failureRedirect: '/'
		}));

var requireAuth = function (req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next()
}




app.listen(port);
console.log('listening on port ' + port)










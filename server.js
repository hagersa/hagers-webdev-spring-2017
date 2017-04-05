var express = require('express');
var app = express();

// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// install, load, and configure passport and cookieParser module
var passport = require('passport'); //, process.ENV.session // should be an environment variable
var cookieParser = require('cookie-parser');
var session = require('express-session');


var connectionString = 'mongodb://127.0.0.1:27017/CS5610';

if(process.env.MLAB_USERNAME) {
	connectionString = process.env.MLAB_USERNAME + ":" +
	process.env.MLAB_PASSWORD + "@" +
	process.env.MLAB_HOST + ':' +
	process.env.MLAB_PORT + '/' +
	process.env.MLAB_APP_NAME;
}
console.log(connectionString);
var mongoose = require('mongoose');
mongoose.connect(connectionString);

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// configure  and initialsize passport and cookieParser
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
//app.use(session({ secret: process.env.SESSION_SECRET }));

// passport
app.use(passport.initialize());
app.use(passport.session());

// require("./test/app")(app);
var assignment = require("./assignment/app.js")(app);
var project = require("./project/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);
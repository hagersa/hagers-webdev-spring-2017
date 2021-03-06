var express = require('express');
var app = express();

// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connectionString = 'mongodb://127.0.0.1:27017/test';

if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}
console.log(connectionString);

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var mongoose = require("./lectures/app.js")(app);

var port = process.env.PORT || 4000;

app.listen(port);
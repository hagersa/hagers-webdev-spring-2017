var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/webdev_spring_2017';
mongoose.connect(connectionString);

var userSchema = mongoose.Schema({
    // validation
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    // add following to manage roles
    role: {type: String, enum: ['STUDENT', 'FACULTY', 'ADMIN', 'USER'], default: 'USER' }
}, {collection: 'lectures_morning_passportjs_user'});

var userModel = mongoose.model('LecturesMorningPassportJsUser');

function createUser(user) {

}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: passowrd});
};

// not finished... check GitHub
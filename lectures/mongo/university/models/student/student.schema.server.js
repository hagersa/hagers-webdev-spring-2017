var mongoose = require('mongoose');
var studentSchema = mongoose.Schema({
    // classical database system
    course: {type: mongoose.Schema.Types.ObjectId, ref:'LecturesMongooseUniversityCourse'}, // students will have a foreign key to say what course they're in; only allows one course, one to many
    username: String
}, {collection: 'lectures.mongoose.university.student'});

module.exports = studentSchema;
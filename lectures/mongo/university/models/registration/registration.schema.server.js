var mongoose = require('mongoose');
var registrationSchema = mongoose.Schema({
    course: {type: mongoose.Schema.Types.ObjectId, ref: 'LecturesMongooseUniversityCourse'},
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'LecturesMongooseUniversityStudent'}
}, {collection: 'lectures.mongoose.university.registration'})

module.exports = registrationSchema;
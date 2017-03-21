// all variables are local. need to use require elsewhere to make it available
var mongoose = require('mongoose');
var courseSchema = mongoose.Schema({
    name: String,
    students: [{type:  mongoose.Schema.Types.ObjectId, ref:'LecturesMongooseUniversityStudent'}]
}, {collection: 'lectures.mongoose.university.course'}); // name of model to be created in database //show dbs, check if you've used name

module.exports = courseSchema;

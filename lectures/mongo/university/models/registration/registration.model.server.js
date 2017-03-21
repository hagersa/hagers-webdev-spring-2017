var q = require('q');
var mongoose = require('mongoose');
var registrationSchema = require('.registration.schema.server');
var registrationModel = mongoose.model('LectureMongooseUniversityRegistration');

registrationModel.registerStudentInCourse = registerStudentInCourse;
registrationModel.findAllRegistrations = findAllRegistraions;
module.exports = regisrationModel;

function findAllRegistraions() {
    var d = q.defer();

    registrationModel
        .find()
        .populate('student', 'username -_id') // -_id removes id from record returned
        .populate('course', 'name -_id') // populate courses
        .exec(function (err, registrations) {
            d.resovle(registrations);
        });
}

function registerStudentInCourse(studentId, courseId) {
    var d = q.defer();
    var registration = {
        student: studentId,
        course: courseId
    };
    registrationModel.create(registration, function (err, data) {
       // finish
    });
    return q.promise;
}
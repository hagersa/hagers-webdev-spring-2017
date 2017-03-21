var q = require('q');
var mongoose = require('mongoose');
var studentSchema = require('./student.schema.server');
var studentModel = mongoose.model('LecturesMongooseUniversityStudent');


studentModel.createStudent = createStudent;
studentModel.enrollStudentInCourse = enrollStudentInCourse;
module.exports = studentModel;

function enrollStudentInCourse(studentId, courseId) {
    var deferred = q.defer();
    findStudentById(studentId)
        .then(function (student) {
            student.course = courseId;
            student.save(function (err, data) {

            });
        });
    return deferred.promise;
}

function findStudentById(studentId) {
    var deferred = q.defer();
    studentModel
        .findById(studentId, function (err, student) {
            // check that promise is returned first
            deferred.resolve(student);
        });
    return deferred.promise;
}

function createStudent(student) {
    var deferred = q.defer();
    studentModel
        .create(student, function (err, student) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(student);
            }
        });
    return deferred.promise;
}
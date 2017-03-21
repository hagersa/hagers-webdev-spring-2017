var mongoose = require('mongoose');
var courseSchema = require('./course.schema.server');
var courseModel = mongoose.model('LecturesMongooseUniversityCourse'); // must be a unique name


courseModel.createCourse = createCourse;
courseModel.findAllCourses = findAllCourses;
courseModel.findCourseById = findCourseById;
courseModel.registerStudentInCourse = registerStudentInCourse;
module.exports = courseModel;

// promise library
var q = require('q');

function registerStudentInCourse(studentId, courseId) {
   var d = q.defer();

   findCourseById(courseId)
       .them(function (course) {
           course.students.push(studentId);
           course.save(function (err, course) {
               d.resolve(course);
           });
       });
}

function findCourseById(courseId) {
    var d = q.defer();

    courseModel
        .findById(courseId, function (err, course) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(course);
            }
        });

    return d.promise;
}

function createCourse(course) {
    courseModel
        .create(course);
}

function findAllCourses() {
    var deferred = q.defer();
    courseModel
        .find(function (err, courses) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(courses);
            }
        });
    return deferred.promise;
}



/*
var api = {
    createCourse: createCourse
}; return api;*/

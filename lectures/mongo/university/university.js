var courseModel = require('./models/course/course.model.server');
var studentModel = require('.models/student/student.model.server');
var registrationModel = require('.models/registration/registration.model.server');
//courseModel.createCourse({name: 'CS5610'});
//courseModel.createStudent({username: 'alice'});

// .remove({}) removes contents of collection
// .drop() removes collection

// one to many (student has one course, course has many student; student know about course
/*studentModel
    .enrollStudentInCourse('') // add studentId, courseId as params
    .then(function (data) {
        console.log(data);
    })*/

// mongoose to do 'joins'
registrationModel.findAllRegistraions()
    .then(function(registrations){
        console.log(registrations);
    })

studentModel
    .createStudent({username: 'alice'})
    .then(function (student) {
        console.log(student);
    })

courseModel
    .findAllCourses()
    .then(function(courses) {
        console.log(courses)
    }, function (err) {
        console.log(err);
    });

courseModel
    .registerStudentInCourse() // add studentId, courseId as params
// module.exports = function () {
//     var mongoose = require('mongoose');
//
//     var UserSchema = mongoose.Schema({
//         username: String,
//         password: String,
//         firstName: String,
//         lastName: String,
//         email: String,
//         phone: String,
//         websites: [{type:  mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
//         dateCreated:  {type: Date, default: Date.now},
//         //role: {type: String, enum: ['']},
//         google: { id: String, token: String}
//     }, {collection: 'assignment.user'});
//
//     return UserSchema;
// };
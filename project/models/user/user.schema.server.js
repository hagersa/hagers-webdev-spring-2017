module.exports = function () {
    var mongoose = require('mongoose');

    var OdhecatonUserSchema = mongoose.Schema({
        username:  {type: String, required: true},
        password: {type: String}, // not set as required, because oauth will not store a password
        firstName: String,
        lastName: String,
        aboutMe: String,
        email: {type: String, required: true},
        dirLibraries: [{type:  mongoose.Schema.Types.ObjectId, ref:'LibraryModel'}],
        memLibraries: [{type:  mongoose.Schema.Types.ObjectId, ref:'LibraryModel'}],
        favorites: [{type:  mongoose.Schema.Types.ObjectId, ref:'FavoriteModel'}],
        following: [{type:  mongoose.Schema.Types.ObjectId, ref:'OdhecatonUserModel'}],
        followers: [{type:  mongoose.Schema.Types.ObjectId, ref:'OdhecatonUserModel'}],
        dateCreated:  {type: Date, default: Date.now},
        role: {type: String, enum: ['ADMIN', 'DIRECTOR', 'MEMBER']},
        google: { id: String, token: String}
    }, {collection: 'odhecaton.user'});

    return OdhecatonUserSchema;
};
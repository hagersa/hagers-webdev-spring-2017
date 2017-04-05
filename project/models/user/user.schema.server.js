module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username:  {type: String, required: true},
        password: {type: String, required: true},
        firstName: String,
        lastName: String,
        email: String,
        libraries: [{type:  mongoose.Schema.Types.ObjectId, ref:'LibraryModel'}],
        favorites: [{type:  mongoose.Schema.Types.ObjectId, ref:'FavoriteModel'}],
        following: [{type:  mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
        followers: [{type:  mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
        dateCreated:  {type: Date, default: Date.now},
        role: {type: String, enum: ['ADMIN', 'DIRECTOR', 'MEMBER']},
        google: { id: String, token: String}
    }, {collection: 'odhecaton.user'});

    return UserSchema;
};
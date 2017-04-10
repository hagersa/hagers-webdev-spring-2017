module.exports = function () {
    var mongoose = require('mongoose');

    var LibrarySchema = mongoose.Schema({
        _user: {type:  mongoose.Schema.Types.ObjectId, ref:'OdhecatonUserModel'},
        name: {type: String, required: true},
        description: String,
        group: String,
        members: [{type:  mongoose.Schema.Types.ObjectId, ref:'OdhecatonUserModel'}],
        widgets: [{type:  mongoose.Schema.Types.ObjectId, ref:'OdhecatonWidgetModel'}],
        dateCreated: {type:Date, default: Date.now}
    }, {collection: 'odhecaton.library'});

    return LibrarySchema;
};
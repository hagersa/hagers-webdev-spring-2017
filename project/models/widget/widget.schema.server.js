module.exports = function () {
    var mongoose = require('mongoose');

    var WidgetSchema = mongoose.Schema({
        _library: {type:  mongoose.Schema.Types.ObjectId, ref:'LibraryModel'},
        widgetType: String,
        name: String,
        text: String,
        placeholder: String,
        url: String,
        width: String,
        height: String,
        size: Number,
        dateCreated: {type:Date, default: Date.now}
    }, {collection: 'odhecaton.widget'});

    return WidgetSchema;
};
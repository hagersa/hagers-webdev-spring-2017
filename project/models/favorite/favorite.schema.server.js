module.exports = function () {
    var mongoose = require('mongoose');

    var FavoriteSchema = mongoose.Schema({
        name: {type: String, required: true},
        type: {type: String, enum: ['PDF', 'YOUTUBE']},
        url: String,
        users: [{type:  mongoose.Schema.Types.ObjectId, ref:'OdhecatonUserModel'}],
        dateCreated:  {type: Date, default: Date.now}
    }, {collection: 'odhecaton.favorite'});

    return FavoriteSchema;
};
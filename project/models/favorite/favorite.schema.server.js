module.exports = function () {
    var mongoose = require('mongoose');

    var FavoriteSchema = mongoose.Schema({
        videoId: String,
        title: {type: String, required: true},
        description: String,
        channelTitle: String,
        publishedAt: String,
        //type: {type: String, enum: ['PDF', 'YOUTUBE']},
        //thumbnail: String, //{url: {type: String}, width: {type: Integer}, height: {type: integer}},
        //url: String,
        users: [{ _id: {type:  mongoose.Schema.Types.ObjectId, ref:'OdhecatonUserModel'}, username: String}],
        dateCreated:  {type: Date, default: Date.now}
    }, {collection: 'odhecaton.favorite'});

    return FavoriteSchema;
};
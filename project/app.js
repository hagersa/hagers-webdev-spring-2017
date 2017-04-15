module.exports = function (app) {

    var odhecatonUserModel = require('./models/user/user.model.server.js')();
    var libraryModel = require('./models/library/library.model.server.js')(odhecatonUserModel);
    var favoriteModel = require('./models/favorite/favorite.model.server')(odhecatonUserModel); // dependencies?
    var widgetModel = require('./models/widget/widget.model.server')(libraryModel);

    require('./services/user.service.server.js')(app, odhecatonUserModel);
    require("./services/library.service.server.js")(app, libraryModel);
    require("./services/favorite.service.server.js")(app, favoriteModel);
    require("./services/widget.service.server.js")(app, widgetModel);
};

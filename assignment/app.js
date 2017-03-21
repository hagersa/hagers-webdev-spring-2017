module.exports = function (app) {

    var userModel = require('./models/user/user.model.server.js')();
    require('./services/user.service.server.js')(app, userModel);
    //require("./services/user.service.server.js")(app, userModel);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};

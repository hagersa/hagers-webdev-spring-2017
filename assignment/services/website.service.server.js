module.exports = function (app) {
    console.log("Hello World from app.js module and website service.server");

    //app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    //app.get("/api/website/:websiteId", findWebsiteById);
    //app.put("/api/website/:websiteId", updateWebsite);
    //app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
    ];

    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;

        var _sites = [];

        for(var w in websites) {
            if(websites[w].developerId === userId) {
                _sites.push(websites[w]);
            }
        }
        if (_sites) {
            res.send(_sites);
            return
        } else {
            res.sendStatus(404); // .send('websites not found')
        }
        return
    }
};



// var userId = req.params.userId;
//
// for(var u in users) {
//     var user = users[u];
//     if(user._id == userId) {
//         res.send(user);
//         return
//     }
// }
// res.sendStatus(404).send({});
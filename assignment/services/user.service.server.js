module.exports = function (app) {

    app.get("/api/user", findUser);
    // Note: findUser handles findUserByUsername and findUserByCredentials,
    //   as specified in class
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    // findUser handles findUserByUsername and findUserByCredentials
    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(req, res);
        } else {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername (req, res) {
        var username = req.query['username'];
        var user = users.find(function (u) {
            return u.username == username;
        });
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        var user = users.find(function (u) {
            return u.username == username && u.password == password
        });

        if (user) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserById(req, res){
        var userId = req.params.userId;

        for(var u in users) {
            var user = users[u];
            if(user._id == userId) {
                res.send(user);
                return
            }
        }
        res.sendStatus(404);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        console.log(userId);

        for (var u in users) {
            var user = users[u];
            if (user._id == userId) {
                var newUser = req.body;
                user.firstName = newUser.firstName;
                user.lastName = newUser.lastName;
                user.password = newUser.password;
                user.email = newUser.email;
                res.sendStatus(200);
                return
            }
        }
        res.sendStatus(404);
    }

    function createUser(req, res) {
        var newUser = req.body;
        newUser._id = (new Date()).getTime()+"";
        users.push(newUser);
        res.json(newUser);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for (var u in users) {
            if (users[u]._id === userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};
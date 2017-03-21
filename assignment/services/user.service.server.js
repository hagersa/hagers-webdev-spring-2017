module.exports = function (app, UserModel) {

    console.log(UserModel);

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
        console.log(username);

        UserModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        console.log(username);
        console.log(password);

        UserModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                console.log(user); // why is this sending back an array of user ids?
                res.send(user);
            }, function (error) {
                res.sendStatus(500)
            });


        // var user = users.find(function (u) {
        //     return u.username == username && u.password == password
        // });
        //
        // if (user) {
        //     res.send(user);
        // } else {
        //     res.sendStatus(404);
        // }
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        console.log(userId);

        UserModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500)
            });
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
        console.log(newUser);
        UserModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });
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
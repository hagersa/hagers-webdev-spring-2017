//console.log("Hello World from server side!");

module.exports = function () {
    console.log("Hello World from app.js module");
    app.get("/api/user", findUserByCredentials);

    var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

    function findUserByCredentials(req, res){ // url I'm listening at // or "/api/morning/user" // req, res passed from express
        var username = req.query['username'];
        var password = req.query['password'];
        var user = users.filter(function(u) {
            return u.username == username && u.password == password
        });

        // 4. // res.send(users); // don't want to send ALL users
        // 3. // res.send({message: "hello from morning class""});
        // 2. // res.send("hello morning class");
        // 1. // console.log("Hellow from user");
    }

    // four ways to connect to server
    // get (fetch), put (modifying things that already exist),
    // post (client gives data to server), delete (removing things that already exist, pages or things we delete)
};
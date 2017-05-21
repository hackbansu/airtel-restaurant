/**
 * Created by hackbansu on 10/5/17.
 */
const express = require('express');
const db = require('./database/JS/database');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local');
const session = require('express-session');
const LocalStrategy = passportLocal.Strategy;
const http = require('http');
const database = require('./database/JS/database')

const app = express();
const server = http.Server(app);
const socket = require('socket.io');
const io = socket(server);
var clients = {};

io.on("connection", function (conn) {
    console.log("a client connected");
    conn.on("myevent", function (data) {
        clients[data] = conn.id;
    });

    conn.on("disconnect", function (data) {
        console.log("User has disconnected " + data)
    });
});


passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
}, function (userName, password, done) {
    console.log("Checking credentials");

    database.usersTable.getUsersDetails({
        userName: userName,
        password: password
    }, ['*'], function (result) {
        if (!result[0]) {
            console.log("Invalid email or password");
            done(null, false, {message: "Invalid email or password"})
        }
        else {
            console.log("successfully logged in");
            done(null, result[0], {message: "SUCCESS"})
        }
    })
}));

passport.serializeUser(function (user, done) {
    return done(null, user.id);
})
passport.deserializeUser(function (id, done) {
    database.usersTable.getUsersDetails({id: id}, ['*'], function (result, fields) {
        return done(null, result[0]);
    })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "airtel sec key",
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session())

//client side handlers
// app.get('/', function (req, res) {
//     res.send('working restaurant');
// })

//req.query = {}
app.get('/getItems', function (req, res) {
    db.itemsTable.getItems(['*'], function (result, fields) {
        // console.log(result);
        res.send(result);
    })
});

//req.query = {}
app.get('/getTimes', function (req, res) {
    db.itemsTable.getItems(['timePerOrder', 'queuedOrders'], function (result, fields) {
        // console.log(result);
        res.send(result);
    })
});

//req.query = {name}
app.get('/searchItems', function (req, res) {
    let name = req.query.name;
    if (!name) {
        res.send('invalid name!');
        return;
    }

    db.itemsTable.searchItems({p_name: name.split(' ')}, ['*'], function (result, fields) {
        // console.log(result);
        res.send(result);
    })
});

app.post('/placeOrder', function (req, res) {
    //some database work to be done


    io.emit("newOrder", req.body.order);
    res.json(true);
});

app.use('/getImage', express.static(path.join(__dirname, '/database/images/')));

//merchant side handlers
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

app.use('/login', function(req, res, next){ console.log('in use login');next();},express.static(path.join(__dirname, '/public_html/loginPage')))

app.use('/', function (req, res, next) {
    if (req['user']) {
        next();
    } else {
        res.redirect('/login');
    }
}, express.static(path.join(__dirname, '/public_html/mainPage')))

app.use('/adminWork', require('./database/JS/adminTasks'));


app.listen(5000, function () {
    console.log("server successfully started at 5000");
})
/**
 * Created by hackbansu on 10/5/17.
 */
const express = require('express');
const db = require('./database/JS/database')
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport')
const passportLocal = require('passport-local')
const session = require('express-session')


const app = express();

passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
}, function (userName, password, done) {
    console.log("Checking credentials");

    database.usersTable.getUsersByIdentity({
        userName: userName,
        password: password
    }, ["id", "email", "fullName"], function (result) {
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
    database.usersTable.getUsersByIdentity({id: id}, ["id", "email", "fullName"], function (result, fields) {
        return done(null, result[0]);
    })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "tale secret key",
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session())

//client side handlers
app.get('/', function (req, res) {
    res.send('working restaurant');
})

//req.query = {}
app.get('/getItems', function (req, res) {
    db.ItemsTable.getItems(['*'], function (result, fields) {
        // console.log(result);
        res.send(result);
    })
});

//req.query = {}
app.get('/getTimes', function (req, res) {
    db.ItemsTable.getItems(['timePerOrder','queuedOrders'], function (result, fields) {
        // console.log(result);
        res.send(result);
    })
});

//req.query = {name}
app.get('/searchItems', function (req, res) {
    let name = req.query.name;
    if(!name){
        res.send('invalid name!');
        return;
    }

    db.itemsTable.searchItems({p_name: name.split(' ')}, ['*'], function (result, fields) {
        // console.log(result);
        res.send(result);
    })
});

app.use('/getImage', express.static(path.join(__dirname, '/database/images/')));


//merchant side handlers
app.post('/login', function (req, res, next) {
    if(req['user']){
        return res.send("You are logged in to an account. Please logout first.");
    }
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send("Invalid email or password");
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.send('login successfully');
        });
    })(req, res, next);
});


app.listen(4100, function () {
    console.log("server successfully started at 4100");
})
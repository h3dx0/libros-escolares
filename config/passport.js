var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

//serializando el obj user paga guardar en sesion
passport.serializeUser(function (user, done) {
    done(null, user.id)
});
// deserializando el obj y devolviendolo
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
});
//config de la Strategy
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    User.findOne({'email': email}, function (err, user) {
        if (err) {
            console.log('error')
            return done(err)
        }
        if (user) {
            //aqui es donde se manda el mensaje usando flash, no hay ningun error ni
            //ningun dato q retornar solo el msg
            return done(null, false, {message: 'Email is already taken.'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if (err) {
                return done(err)
            }
            return done(null, newUser);
        })
    })
}));
//config de la Strategy para signin
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    User.findOne({'email': email}, function (err, user) {
        if (err) {
            console.log('error')
            return done(err)
        }
        if (!user) {
            //aqui es donde se manda el mensaje usando flash, no hay ningun error ni
            //ningun dato q retornar solo el msg
            return done(null, false, {message: 'Wrong data.'});
        }
        if(!user.validPassword(password)){
            return done(null, false, {message: 'Wrong data.'});
        }
        return done(null, user);
    })
}));

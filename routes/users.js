let express = require('express');
let router = express.Router();
let csrf = require('csurf');
let csrfProtection = csrf();
let passport = require('passport');
let User = require('../models/user');
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function (req, res, next) {
    res.render('user/profile', {user: req.user});
});

router.get('/profile/edit/personal-info', isLoggedIn, function (req, res, next) {
    res.render('user/edit/edit_personal_info', {user: req.user, csrfToken: req.csrfToken()});
});

router.post('/profile/edit/personal-info', isLoggedIn, function (req, res, next) {
    let name = req.body.name;
    let firstName = req.body.firstName;
    let email = req.body.email;
    if (email === "" || name === "" || firstName === "") {
        return res.render('user/edit/edit_personal_info', {user: req.user, csrfToken: req.csrfToken(), msg: 'No puede dejar ninugn campo vacio'});
    }
    let user = User.findById(req.user._id, function (err, user) {
        if (err) {
            console.log('Error al editar usuario')
            res.render('user/edit/edit_personal_info', {user: req.user, csrfToken: req.csrfToken()});
        }
        user.name = name;
        user.email = email;
        user.firstName = firstName;
        user.save(function (err, user) {
            if (err) {
                console.log('Error al editar usuario')
                res.render('user/edit/edit_personal_info', {user: req.user, csrfToken: req.csrfToken()});
            }
            res.redirect('/user/profile');

        })
    });

});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/')
});


//esta ruta se aplica a todas las rutas q hay debajo de ellas  es decir aplica el middleware a todas
router.use('/', notLoggedIn, function (req, res, next) {
    return next();
});

router.get('/signup', function (req, res, next) {
    let messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

//aqui aplicamos passport
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/signin', function (req, res, next) {
    let messages = req.flash('error');
    console.log(messages)
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));


module.exports = router;

//proteger las rutas y el isAuthenticated es d passport
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

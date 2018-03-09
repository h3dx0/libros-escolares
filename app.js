let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let index = require('./routes/index');
let users = require('./routes/users');
let nomencladores = require('./utiles/nomencladores');
let cloudinary = require('cloudinary').v2;
let config = require('./config');
//const fileUpload = require('express-fileupload');

let app = express();

cloudinary.config({
    cloud_name: 'h3dx0',
    api_key: '862856891596518',
    api_secret: '9L4z9ALHfOpHl7SXuNq5b5AFimQ',
    base_url: 'http://res.cloudinary.com/h3dx0'
});

app.use(function (req, res, next) {
    //para agregar la variable login y session a todas los view(.hbs)
    res.locals.gradosEscolares = nomencladores.gradosEscolares;
    res.locals.imagesUrl = config.imagesUrl;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

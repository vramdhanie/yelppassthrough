const  express = require('express');
const  path = require('path');
const  favicon = require('serve-favicon');
const  logger = require('morgan');
const  cookieParser = require('cookie-parser');
const  bodyParser = require('body-parser');
const  cors = require('cors');
const  session = require('express-session');
const  passport = require('passport');
const  LocalStrategy = require('passport-local').Strategy;
const  index = require('./routes/index');
const  users = require('./routes/users');
const  bars = require('./routes/bars');

const app = express();

app.use(session({
    secret:'yo'
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
    function(username, password, done) {
        findUser(username, function (err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false)
            }
            if (password !== user.password  ) {
                return done(null, false)
            }
            return done(null, user)
        })
    }
))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//set up cors
app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/bars', bars);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

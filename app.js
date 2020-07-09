require('dotenv').config();
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGODB_URI || /*'mongodb://heroku_jl0vc8f0:m5r4nhcibtrpj5vj91ie4aopdr@ds141783.mlab.com:41783/heroku_jl0vc8f0' || */ 'mongodb://localhost/IRONFIRNES-PROJECT2');



const app = express();

const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = mongoose.connection;
app.use(
  session({
    secret: "mysecretstring",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: db,
      ttl: 24 * 60 * 60 * 1000
    })
  })
);

//Passport Setup
const User = require('./models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;




app.use(passport.initialize());
app.use(passport.session());
app.use(flash());




//serialize
passport.serializeUser((user, done) => {
  done(null,user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(dbUser => {
    done(null,dbUser);
  })
  .catch(err => {
    done(err);
  });
});


passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username})
    .then(found => {
      if(found === null) {
        done(null, false, {message: "Wrong info" });
      } else if (!bcrypt.compareSync(password, found.password)) {
        done(null, false, {message: "Wrong info"});
      } else {
        done(null, found);
      }
    })
    .catch(err => {
      done(err, false);
    });
  })
);

console.log(process.env.SESSION_SECRET)
//Github Login 
const GithubStrategy = require('passport-github').Strategy;

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: '/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // find a user with profile.id as githubId or create one
      User.findOne({ githubId: profile.id })
        .then(found => {
          if (found !== null) {
            // user with that githubId already exists
            done(null, found);
          } else {
            // no user with that githubId
            return User.create({ githubId: profile.id }).then(dbUser => {
              done(null, dbUser);
            });
          }
        })
        .catch(err => {
          done(err);
        });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
app.use('/', index);

const workouts = require('./routes/workouts');
app.use('/', workouts);


const auth = require('./routes/auth');
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

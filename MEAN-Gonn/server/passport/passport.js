const FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
var session = require('express-session');

module.exports = (app, passport) => {
  app.use(passport.initialize());
  app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: false,
 
  }));
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  passport.use(new FacebookStrategy({
    clientID: '1879403279041868',
    clientSecret: '82f50115ebce51f51b193684f964648b',
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile._json);
      User.findOne({ email: profile._json.email }, (err, user) => {
        if (err) {
          done(err);
        }
        if (user && user != null) {
          console.log("User login with Facebook :"+user);
          done(null, user);
        }
      });
      done(null, profile);
    }
  ));



  // Use the GoogleStrategy within Passport.
  passport.use(new GoogleStrategy({
    clientID: '761282640471-qo3fsh9q3ej43jg58sqv4qeighjvteup.apps.googleusercontent.com',
    clientSecret: 'S2c6e9M_265IkPiGA00pxbBX',
    callbackURL: "http://localhost:8080/auth/google/callback"
  }, function (accessToken, refreshToken, profile, done) {
     console.log(profile._json);
    User.findOne({ email: profile._json.emails[0].value }, (err, user) => {
      if (err) 
      {
        done(err);
      }
      else if (user) { 
        console.log("User login with google :"+user);
        done(null, user);
       
      }
      
    });
    done(null, profile);
  }
  ));


  /**
   * Login with facebook
   */
 
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/user/login' }),
  function (req, res) {
    req.session.user=req.session.passport.user;

    res.redirect('/index');
  });

  /**
   * Login with Google
   */
  app.get('/auth/google', passport.authenticate('google', { scope: 'email' }));
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/login' }),
    function (req, res) {
      
      req.session.user=req.session.passport.user;
     
      res.redirect('/index');
    });

  return passport;
}
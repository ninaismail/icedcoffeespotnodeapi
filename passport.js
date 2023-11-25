var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require("passport");
const User = require("./models/User");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
//Google Strateg
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
function(accessToken, refreshToken , profile, done) {
  done(null, profile);
}));
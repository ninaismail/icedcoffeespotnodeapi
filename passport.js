const passport = require("passport");
const User = require("./models/User");
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, doc) => {
        done(null, doc);
    });
});
//Google Strateg
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
function(accessToken, refreshToken , profile, cb) {
  User.findOne({email: profile.email}, async (err, user) => {
      if(err) return cb(err, null);
      if(!user) {
          const newUser = new User({
              email: profile.email,
              phone: profile.phone,
              password: CryptoJS.AES.encrypt(
                profile.password,
                process.env.SEC_PASS_KEY
              ).toString()
          });
          await newUser.save();
          cb(null, newUser);
      }
      cb(null, user);
  });
}));
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`, // Full URL
      // Or relative: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
      
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          
          const firstName = profile.name?.givenName || profile.displayName?.split(' ')[0] || 'User';
          const lastName = profile.name?.familyName || profile.displayName?.split(' ').slice(1).join(' ') || '';
          
          
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            fullName: {
              firstName: firstName,
              lastName: lastName || 'User' 
            },
            email: profile.emails[0].value, 
            avatar: profile.photos[0].value,
          });
        }

        return cb(null, user); // 'cb' callback function 
      } catch (error) {
        console.error("Google OAuth error:", error);
        return cb(error, null);
      }
    }
  )
);

// Serialize aur deserialize bhi add karo (optional, but recommended)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
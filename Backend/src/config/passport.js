const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`, 
      proxy: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Try finding user based on Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If no Google ID, check if email already exists via normal signup
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // Link google account to existing user
            user.googleId = profile.id;
            if (!user.avatar) user.avatar = profile.photos[0].value;
            await user.save();
          } else {
            // Create a completely new user
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
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authControllers = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.middleware");

const router = express.Router();

/* Regular Auth Routes */
router.post('/register', authControllers.registerUser);
router.post('/login', authControllers.loginUser);
router.get('/profile', authUser, authControllers.getProfile);
router.post('/logout', authControllers.logoutUser);

/* Google OAuth Routes */
router.get('/google',
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: 'select_account' // ✅ This will show all google accounts to select
  })
);

router.get("/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`
  }),
  (req, res) => {
    try {
      console.log("✅ Google auth successful for:", req.user.email);

      // Check if user exists
      if (!req.user) {
        console.error("❌ No user in req.user");
        return res.redirect(`${process.env.CLIENT_URL}/login?error=no_user`);
      }

      // Generate token
      const token = jwt.sign(
        { id: req.user._id, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      console.log("✅ Token generated:", token.substring(0, 20) + "...");

      // ✅ Save token in cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'lax'
      });

      // ✅ Redirect to frontend with token in query param
      const redirectUrl = `${process.env.CLIENT_URL}/auth/success?token=${token}`;

      console.log("✅ Redirecting to:", redirectUrl);

      res.redirect(redirectUrl);

    } catch (error) {
      console.error("❌ OAuth callback error:", error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
    }
  }
);

module.exports = router;
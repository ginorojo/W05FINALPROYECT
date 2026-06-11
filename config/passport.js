const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || 'your_client_id_here',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'your_client_secret_here',
    callbackURL: "http://localhost:3000/api/auth/github/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
            user = new User({
                githubId: profile.id,
                username: profile.username || profile.displayName
            });
            await user.save();
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
  }
));

module.exports = passport;

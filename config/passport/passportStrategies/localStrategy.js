const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../../../models/user');
const chalk = require('chalk');


const loginStrategyWithPassport = new LocalStrategy(async function verify(username, password, done) {

  try {
    const user = await User.findOne({username});
    if(!user) {
      return done(null, false, {message: 'Incorrect username or password'});
    }
    const match = await bcrypt.compare(password, user.password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, {message: 'Incorrect username or password'});
    }

  } catch(err) {
    return done(err);
  }
});

const signUpStrategyWithPassport = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        profileImage: req.file.filename,
      });
      User.createUser(newUser);
      return done(null, newUser);
    } catch(err) {
      done(err);
    }
  }
)


// Done callback below will place user info in session. user info is passed here from verify callback
// in local strategy
passport.serializeUser((user, done) => {
  return done(null, {userId: user.id, username: user.username});
})


// Below function is called automatically and it gets user infoemation from session. It then checks this
// user info against the database. Done callback will populate this info on req.user
passport.deserializeUser(async(userInfoFromSession, done) => {
  try {
    const user = await User.getUserById(userInfoFromSession.userId);
    if(user)
      return done(null, user);
  } catch(err) {
    return done(err);
  }
})

module.exports = {
  loginStrategyWithPassport,
  signUpStrategyWithPassport,
}

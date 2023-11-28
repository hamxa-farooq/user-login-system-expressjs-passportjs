const passport = require('passport');

const localStrategy = require('./passportStrategies/localStrategy');

passport.use('login', localStrategy.loginStrategyWithPassport);
passport.use('signup', localStrategy.signUpStrategyWithPassport);

module.exports = passport;

const passport = require("passport");

const localStrategy = require("./passportStrategies/localStrategy");

passport.use('login', localStrategy.loginStrategyWithPassport);

module.exports = passport;

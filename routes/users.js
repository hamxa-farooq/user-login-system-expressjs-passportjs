const express = require('express');
const router = express.Router();
const passport = require('passport');

const multer = require("multer");
const upload = multer({
  dest: './uploads'
})

const validateUserRegister = require('../helpers/validation');
const checkValidationErrors = require('../middlewares/checkValidationErrors');
const authenticateRequest = require('../middlewares/authenticateRequest')
const User = require('../models/user');


router.get('/register', (req, res, next) =>{
  res.render('register', {title: 'Register'});
})

router.post('/register', upload.single('profileImage'), validateUserRegister(),  checkValidationErrors, (req, res) => {

  if(!User.isUserInDatabase(req.body.username)) {
    // Create a document by instanciating the model
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      profileImage: req.file.filename,
    });

    User.createUser(newUser);

    req.flash('success', 'You are registered and can login now');
    res.location('/');
    res.redirect('/');

  } else {
    req.flash('error', 'The username already exists');
    res.redirect('/user/register')
  }
});

router.get('/login', async (req, res, next) =>{
  res.render('login', {title: 'Login'});
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}));

router.get('/', authenticateRequest, (req, res, next) => {
  console.log('req.user', res.locals)
  res.send('respond with a resource');
});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success', 'you have been logged out');
    res.redirect('/user/login');
  });
});

module.exports = router;

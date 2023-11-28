const express = require('express');
const router = express.Router();
const passport = require('passport');

const multer = require("multer");
const upload = multer({
  dest: './uploads'
})

const store = require('../config/mongoStore/storeConfig')

const validateUserRegister = require('../helpers/validation');
const checkValidationErrors = require('../middlewares/checkValidationErrors');
const authenticateRequest = require('../middlewares/authenticateRequest')
const User = require('../models/user');


router.get('/register', (req, res, next) =>{
  res.render('register', {title: 'Register'});
})

router.post('/register',
  upload.single('profileImage'),
  validateUserRegister(),
  checkValidationErrors,
  (req, res, next) => {
    passport.authenticate('signup', async (err, user, info)=> {
      req.flash('success', 'Successfully registered, Pleas login');
      res.redirect('/user/login');
    })(req, res, next)
  }
  )

router.get('/login', async (req, res, next) =>{
  res.render('login', {title: 'Login'});
})

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}));

router.get('/', authenticateRequest, (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/logout', async (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err); }
    store.destroy(req.sessionID, (err) => {
      res.clearCookie('connect.sid');
      res.render('login');
    })
  });
});

module.exports = router;

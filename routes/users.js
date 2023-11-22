var express = require('express');
var router = express.Router();
const { validationResult, body } = require('express-validator');

var multer = require("multer");
var upload = multer({
  dest: './uploads'
})

const validateUserRegister = require('../helpers/validation');
const checkValidationErrors = require('../middlewares/checkValidationErrors')
const User = require('../models/user');


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/register', (req, res, next) =>{
  res.render('register', {title: 'Register'});
})

router.get('/login', (req, res, next) =>{
  res.render('login', {title: 'Login'});
})

router.post('/register', upload.single('profileImage'), validateUserRegister(),  checkValidationErrors, (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  const profileImage = req.file.filename;

  // Create a document by instanciating the model
  const newUser = new User({
    name,
    email,
    username,
    password,
    profileImage,
  });

  User.createUser(newUser);

  req.flash('success', 'You are registered and can login now');
  res.location('/');
  res.redirect('/');

})

module.exports = router;

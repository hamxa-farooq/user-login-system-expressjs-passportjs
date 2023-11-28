const { body, check } = require('express-validator');

const User = require('../models/user');

const validateUserRegister  = () => {
  return [
    body('name', 'name does not exist').notEmpty(),
    body('email', 'email does not exist').notEmpty(),
    body('email', 'email is not valid').isEmail(),
    check('email').custom( async value => {
      if( await User.isUserInDatabase({email: value}))
        return Promise.reject();
    }).withMessage('email already exists'),
    body('username', 'username does not exist').notEmpty(),
    check('username').custom(async value => {
      if(await User.isUserInDatabase({username: value}))
        return Promise.reject();
    }).withMessage('username already exists'),
    body('password', 'password does not exist').notEmpty(),
    body('password2', 'confirm password does not exist').notEmpty(),
    check('password2').custom((value, {req}) => {
      return value == req.body.password;
    }).withMessage('passwords do not match'),
    check('profileImage')
    .custom((value, {req}) => {
            if(req?.file){
                return true;
            }else{
                return false;
            }
      }).withMessage('image does not exist')
   ]
}

module.exports = validateUserRegister;

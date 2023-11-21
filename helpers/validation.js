const { body, check } = require('express-validator');

const validateUserRegister  = () => {
  return [
    body('name', 'name does not exist').notEmpty(),
    body('email', 'email does not exist').notEmpty(),
    body('email', 'email is not valid').isEmail(),
    body('username', 'username does not exist').notEmpty(),
    body('password', 'password does not exist').notEmpty(),
    body('password2', 'confirm password does not exist').notEmpty(),
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

const { validationResult } = require('express-validator');

const checkValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if(validationErrors.isEmpty()) {
    next();
  } else {
    console.log(validationErrors.array());
    res.render('register', {errors: validationErrors.array()});
  }
}
module.exports = checkValidationErrors;

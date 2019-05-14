

const { check } = require("express-validator/check");



module.exports = {
    
    userRegisterValidate: [
        check('name', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password')
            .isLength({ min: 5 }).withMessage('Password must be at least 5 characters in length.')
            .matches('[0-9]').withMessage('Password must contain at least 1 number.')
            .matches('[a-z]').withMessage('Password must contain at least 1 lowercase letter.')
            .matches('[A-Z]').withMessage('Password must contain at least 1 uppercase letter.')

          
    ]
   
}

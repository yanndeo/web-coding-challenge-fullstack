const express =  require('express');
const router = express.Router();
const { validationResult } = require("express-validator/check");

//Model
const User =  require('../../models/User');
//Validation 
const checked = require('../../validations/registerValidate');


/**
 * @api      POST api/users/register
 * @desc     Register Route
 * @access   Public */
router.post('/register', checked.userRegisterValidate, async(req, res)=>{

    //check Errors Validations
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(422).json({ errors: errors.array() })
    };

    let { name, email, password} = req.body;

    try {

        //check if user exist already
        let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exist' }] });

            }else{

                //instance model
                user = new User({ name,email,password });

                //Encrypt paassword ::User Model

                //Save user
                await user.save();

                //Return jsonwebtoken ::User Model
                const token = await User.generateWebToken(user.id);

                return res.status(201).json({ token })
            }
                

            
    } catch (error) {
        console.error('register_user_error', error.message);
        res.status(500).send('Server error')

    }
});




module.exports = router;
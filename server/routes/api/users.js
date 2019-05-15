const express =  require('express');
const router = express.Router();
const { validationResult } = require("express-validator/check");
const bcrypt =  require('bcryptjs');

//Model
const User =  require('../../models/User');
//Validations
const checked = require('../../validations/userValidate');



/**
 * @api      POST api/register
 * @desc     Register Route
 * @access   Public 
 * */
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
                // const token = await User.generateWebToken(user.id);
                return res.status(201).json({ user })
            }
                

            
    } catch (error) {
        console.error('register_user_error', error.message);
        res.status(500).send('Server error')

    }
})



/**
 * @api      POST api/login
 * @desc     Authentificate user & and get token (login)
 * @access   Public 
 * */
router.post('/login', checked.userLoginValidate, async (req, res) => {

    //check Errors Validations
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });


    let { password, email } = req.body;

    try {
        //check if user not exist 
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        //Compare user 's password : return boolean.
        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });

        }

        console.log('user_id', user.id)
        //Return jsonwebtoken ::User Model
        const token = await User.generateWebToken(user.id);

        return res.status(201).json({ token })


    } catch(error) {

        console.log('login_user_error:', error.message);
        res.status(500).send('Server error')
    }

});











module.exports = router;
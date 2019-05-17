const express = require('express');
const router = express.Router();
const User =  require('../../models/User');
//Middleware 
const authorization = require('../../middleware/authorization')


/**
 * @api      GET  api/auth
 * @desc     Return data of User authentificate.
 * @access   Private */
router.get('/', authorization, async(req, res) => {

    try {
        const user =  await User.findById(req.user.id).select('-password -updatedAt -__v');
       
       return res.status(200).json(user)

    } catch (error) {
        console.error('get_user_auth_error',error)
         res.status(500).send('Server error')
    }

});

module.exports = router;
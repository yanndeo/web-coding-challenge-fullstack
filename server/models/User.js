const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("config");



/**
 * BUILD SCHEMA
 */
const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        set: emailtoLower
    },
    password: {
        type: String,
        required: true,
        unique: true
    }, 
  
    
}, {timestamps: true});





/**
 * SETTER FUNCTION
 */
function emailtoLower(v) {
    return v.toLowerCase();
}


/**
 * HOOK MONGOOSE:
 * Encrypt password
 */
UserSchema.pre('save', async function (next) {

    const user = this;

    if (!user.isModified || !user.isNew) {
        next();

    } else {

        try {
            const salt = await bcrypt.genSalt(config.get('pwdSalt'));
            user.password = await bcrypt.hash(user.password, salt);
            next();

        } catch (error) {
            console.log('hash_pwd_error:', error.message);
            res.status(500).send('could not hash password ')
        }
    }


}); 


/**
 * STATIC METHOD : 
 * Generate user token ,
 */
UserSchema.statics.generateWebToken = async function(ID) {

  try {


    const payload = { user: { id: ID } };

    return await jwt.sign(
                    payload,
                    config.get('jwtSecret'), {
                    expiresIn: config.get('expirationTime') 
                  });

  } catch (error) {

    console.log("save_user_error:", error.message);
    res.status(500).send("Server error");
  }
};



//MODEL
const User = mongoose.model("users", UserSchema);
module.exports = User;
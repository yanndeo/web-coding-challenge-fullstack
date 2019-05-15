
const jwt =  require('jsonwebtoken');
const config = require('config');

module.exports =  function(req, res, next){

    //Get token from header
    const token = req.header('x-auth-token');

    if (!token) {
        res.status(401).json({ msg: ' No token ,authorization denied' })
    } else {

        //verify token
        try {
              decode = jwt.verify(token, config.get("jwtSecret"));

              console.log('decode: ',decode); // object

              req.user = decode.user;

              next();
            } catch (error) {

            console.log("middleware_token_verify:", error.message);

            res.status(401).json({ msg: 'token is not valid' })
        }

    }

}
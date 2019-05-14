const express = require('express');
const router = express.Router();





// @route    GET api/shops
// @desc     Shops list Route
// @access   Public
router.get('/', (req, res) => {

    res.send('Shops route')
});




module.exports = router;
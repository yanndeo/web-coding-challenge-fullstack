const express = require('express');
const router = express.Router();

//Middleware 
const authorization = require('../../middleware/authorization');

//Model
const Shop =  require('../../models/Shop');



/**
 * @api      GET api/shops
 * @desc     Get all shops
 * @access   Public 
 * */
router.get('/', async(req, res) => {

    try {

        const shops = await Shop.find().sort({ name: 1 }).select('-__v');

        return res.status(200).json(shops);

    } catch (error) {
        console.error('get_all_shops_error', error.message);
        return res.status(500).send('Server error')
    }
});



/**
 * @api      PUT api/shops/like/:shopID
 * @desc     User connected 'like' a shop
 * @access   Private 
 * */
router.put('/like/:shopID',authorization, async(req, res) => {


    try {

        let shop = await Shop.findById(req.params.shopID).select('-__v');

        if(!shop)
            return res.status(404).send({ msg:'Sorry Shop not found'});

        else{
              //Check if user has already 'like' this shop:
            if( shop.likes.filter(like=> like.user.toString() === req.user.id ).length > 0 )
                
                return res.status(400).json({ msg: 'Shop already liked' });

            //Check if User disliked this shop before:
            if (shop.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0) {

                //Delete his dislike
                const removeIndex = shop.dislikes.map(dislike => dislike.user.toString()).indexOf(req.user.id);
                shop.dislikes.splice(removeIndex, 1);

                //And add his like
                shop.likes.unshift({ user: req.user.id });
                await shop.save();
                return res.status(200).json(shop);
            }

            //Check if user has never dislike this shop:
            if (shop.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length === 0) {

                shop.likes.unshift({ user: req.user.id });
                await shop.save();
                return res.status(200).json(shop);

            }
              

        }


    } catch (error) {
        
        console.log("user_like_shop", error.message);

        if (error.king === "ObjectId") {
            res.status(404).send({ msg: "Sorry Shop not found" });
        }
        res.status(500).send("Server Error");
    }
 
});

/**
 * @api      PUT api/shops/dislike/:shopID
 * @desc     User connected 'like' a shop
 * @access   Private 
 * */
router.put('/dislike/:shopID', authorization, async(req, res) => {


    try {

        let shop = await Shop.findById(req.params.shopID).select('-__v');

        if (!shop)
            return res.status(404).send({ msg: 'Sorry Shop not found' });

        else {

            //Check if user has already 'dislike' this shop:
            if (shop.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ msg: 'Shop already disliked' });
            }

            //Check if User liked this shop before:
            if (shop.likes.filter(like => like.user.toString() === req.user.id).length > 0) {

                //Delete his like
                const removeIndex = shop.likes.map(like => like.user.toString()).indexOf(req.user.id);
                shop.likes.splice(removeIndex, 1);

                //And add his dislike
                shop.dislikes.unshift({ user: req.user.id });
                await shop.save();
                return res.status(200).json(shop);
            }

            //Check if user has never like this shop:
            if (shop.likes.filter(like => like.user.toString() === req.user.id).length === 0){

                shop.dislikes.unshift({ user: req.user.id });
                await shop.save();
                return res.status(200).json(shop);

            }
            
                

        }


    } catch (error) {

        console.log("user_like_shop", error.message);

        if (error.king === "ObjectId") {
            res.status(404).send({ msg: "Sorry Shop not found" });
        }
        res.status(500).send("Server Error");
    }

});


/**
 * @api      GET api/shops/:distance
 * @desc     Get list of shops sorted by distance.
 * @access   Private 
 * */
router.get('/distance/:distance', authorization, async (req, res) => {

    try {

        let distance =Number(req.params.distance);

        const shops = await Shop.find({
            location: {
                $near: {
                    $maxDistance: 1000/6371,
                
                }
            }
        }) ;


        return res.status(200).json(shops);

    } catch (error) {

        console.error('get_list_shops_by_distance', error.message);
        return res.status(500).send('Server error')
    }
});







/**
 * @api      GET api/shops/:id
 * @desc     Get shop by ID
 * @access   Public 
 * */
router.get('/:id', async (req, res) => {

    try {

        const shop = await Shop.findById(req.params.id).select('-__v')

        if (!shop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }
        return res.status(200).json(shop);

    } catch (error) {

        console.error('get_shop_by_id', error.message);

        if (err.king === 'ObjectId') {
            res.status(404).send({ msg: 'Sorry shop not found' });
        }
        return res.status(500).send('Server error')
    }
});


module.exports = router;
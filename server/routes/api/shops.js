const express = require('express');
const router = express.Router();

//Middleware 
const authorization = require('../../middleware/authorization');

//Model
const Shop =  require('../../models/Shop');





/**
 * @api      GET api/shops
 * @desc     Get all shops 
 * @desc     Main list without shops already liked
 * @desc     And sorted by distance
 * @access   Private 
 * */
router.get('/', authorization, async (req, res) => {

    try {

        let shops = await Shop.shopsMainListWithoutShopsLiked(req.user.id);

        return res.json(shops);

    } catch (error) {
        console.error('get_all_main_shops_error:', error.message);
        return res.status(500).send('Server error')
    }
});






/**
 * @api      GET api/shops/preferred
 * @desc     Get list of shops preferred by user .
 * @access   Private 
 * */
router.get('/preferred', authorization, async (req, res) => {

    try {

        let shops_preferred = await Shop.shopsListPreferredByUser(req.user.id);

        if (shops_preferred.length === 0) {
            return res.status(404).send({ msg: "You still have nothing in your favorites ." });

        } else {
            return res.json(shops_preferred);
        }

    } catch (error) {
        console.log("shop_preferred:", error.message);
        return res.status(500).send("Server Error");
    }
})





/**
 * @api      GET api/shops/default
 * @desc     Get all shops without criteria.
 * @access   Public 
 * */
router.get('/default', async (req, res) => {
    try {
        const shops = await Shop.find().sort({ name: 1 }).select("-__v");

        return res.json(shops);

    } catch (error) {
        console.error("get_allshops_error", error.message);
        return res.status(500).send("Server error");
    }
});






/**
 * @api      PUT api/shops/like/:shopID
 * @desc     User connected 'like' a shop
 * @access   Private 
 * */
router.put('/like/:shopID',authorization, async(req, res) => {


    try {

        let shop = await Shop.getShopByID(req.params.shopID);


        if(!shop)
            return res.status(404).json({ msg:'Sorry Shop not found'});

        else{
              //Check if user has already 'like' this shop:
            if( shop.likes.filter(like=> like.user.toString() === req.user.id ).length > 0 )
                
                return res.status(409).json({ msg: `You already liked and added the "${shop.name}" shop to your favorites .` }); // 409 : conflict

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
        
        console.log("user_like_shop:", error.message);

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

        let shop = await Shop.getShopByID(req.params.shopID);

        if (!shop)
            return res.status(404).send({ msg: 'Sorry Shop not found' });

        else {

            //Check if user has already 'dislike' this shop:
            if (shop.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0) {
                return res.status(409).json({ msg: `You already disliked the "${shop.name}" shop .` }); // 409 : conflict

            }

            //Check if User liked this shop before:
            if (shop.likes.filter(like => like.user.toString() === req.user.id).length > 0) {

                //Delete his like :we can't have in same shop 'like' and 'dislike' of a same user 
                const removeIndex = shop.likes.map(like => like.user.toString()).indexOf(req.user.id);
                shop.likes.splice(removeIndex, 1);

                //And add his 'unlike'
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
 * @api      Put api/shops/remove/dislike/:shopID
 * @desc     Remove dislike  on shop of user 'without like'this shop
 * @desc     This shop will be displayed next, in the main list.
 * @access   Private 
 * */

router.put('/remove/dislike/:shopID', authorization, async (req, res) => {


    try {

        let shop = await Shop.getShopByID(req.params.shopID);

        if (!shop)
            return res.status(404).send({ msg: 'Sorry Shop not found' });

        else {

            //Check if user has dislike this shop
            if (shop.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0) {

                //Remove it : 
                const removeIndex = shop.dislikes.map(dislike => dislike.user.toString()).indexOf(req.user.id);
                shop.dislikes.splice(removeIndex, 1);

                //And save the shop without added like
                await shop.save();
                return res.status(200).json(shop);

            }else{
                res.status(404).send({ msg: "Sorry Not found" });

            }
        }

    } catch (error) {
        console.log("remove_dislike_shop", error.message);

        if (error.king === "ObjectId") {
            res.status(404).send({ msg: "Sorry Shop not found" });
        }
        res.status(500).send("Server Error");
    }

});



/**
 * @api      GET api/shops/:shopID
 * @desc     Get shop by ID
 * @access   Public 
 * */
router.get('/:shopID', async (req, res) => {

    try {

        const shop = await Shop.getShopByID(req.params.shopID); ;

        if (!shop) {
            return res.status(404).json({ msg: 'Sorry Shop not found' });
        }
        return res.status(200).json(shop);

    } catch (error) {

        console.error('get_shop_by_id', error.message);

            if (error.king === 'ObjectId'){
                res.status(404).send({ msg: "Sorry shop not found" });
            } 
        return res.status(500).send('Server error')
    }
});







/**
 * @api      DELETE api/shops/preferred/:shopID
 * @desc     Get list of shops preferred by user .
 * @access   Private 
 * */
router.delete('/preferred/:shopID', authorization, async (req, res) => {

    //middleware authorization give me 'user connected'
    try {
        
        //Make sure shop exist:
        let shop = await Shop.getShopByID(req.params.shopID);

        if(!shop){

            res.status(404).send({ msg: "Sorry shop not found" });

        }else{

            //Make sure his preferreds shop list contain this shop:
            if (shop.likes.filter(like => like.user.toString() === req.user.id).length > 0) {

                //Delete
                const removeIndex = shop.likes.map(like => like.user.toString()).indexOf(req.user.id);
                shop.likes.splice(removeIndex, 1);

                //save
                await shop.save();
                return res.status(200).json({ msg: ` " ${shop.name} " shop removed from list .` });
            }
            else{
                return res.status(400).json({ msg: "this shop does not appear in your list . " });

            }

        }

           
    } catch (error) {
        console.error("shop_preferred_delete:", error.message);
        res.status(500).send("Server Error");
    }
})





module.exports = router;






/**
 * shop.likes.map(like => like.user.toString()).indexOf(req.user.id)
 * map()=>give me a table containing all the users who liked this shop.
 * indexOf()=> and check if the logged-in user is inside this table[].
 */
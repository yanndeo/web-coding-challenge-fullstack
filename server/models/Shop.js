const mongoose =  require('mongoose');


const ShopSchema = new mongoose.Schema({

name:{
    type:String,
    required:true,
},

description:{
    type:String,
},

 type:{
    type:String,
   // enum: ['restaurant', 'Ready-To-wear', 'perfumeries','apple-store', 'mall', 'phone-store']
},

imageURL:{
    type : String
},

location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },

contact_information:{
    phone:{
        type:String,
        require: true
    },
    street:{
        type: String,
        required: true,
    },
    city: {
        type:String,
    },
    zipcode:{
        type:String,
    },

},
 dislikes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
            dislikedAt:{
                type: Date, 
                default: Date.now
             }
            
        }
    ],
   likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],

   


});


ShopSchema.index({location: "2dsphere" });

/* ****************************************************** METHODS *********************************** */

/**
 * STATIC METHOD: 
 * Return Main shops list .Without the shops already liked. 
 */
ShopSchema.statics.shopsMainListWithoutShopsLiked = async function (userID) {
    try {
           return await Shop.find()
                            .where('likes.user').ne(userID)
                            .where('dislikes.user').ne(userID)
                            .sort({ 'location.coordinates': -1 }) // ??: A revoir
                            .select("-__v");
    } catch (error) {
        console.error("shop_main_list_method:", error.message);
        res.status(500).send("Server Error");
    }
};


/**
 * STATIC METHOD: 
 * Return Shops that user liked
 */
ShopSchema.statics.shopsListPreferredByUser = async function(userID) {
  try {
    return await Shop.where("likes.user")
                     .equals(userID)
                     .select("-dislikes -__v")
                     .sort({ _id: -1 });
  } catch (error) {
    console.error("shop_preferred_method:", error.message);
    res.status(500).send("Server Error");
  }
};


/**
 * STATIC METHOD: 
 * Return one Shop
 */
ShopSchema.statics.getShopByID = async function(shopID) {

    try {
        return await Shop.findById(shopID)
                         .select("-__v");

    } catch (error) {
        console.error("find_shop_method:", error.message);
        res.status(500).send("Server Error")
    }
};






const Shop = mongoose.model('shops', ShopSchema);

module.exports = Shop;
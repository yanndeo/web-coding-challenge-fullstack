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
    enum: ['restaurant', 'Ready-To-wear', 'perfumeries','apple-store', 'mall', 'phone-store']
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
 * Return Shops that user liked
 */
ShopSchema.statics.getShopByID = async function(shopID) {

    try {
        console.log(shopID)
        return await Shop.findById(shopID)
                         .select("-__v");

    } catch (error) {
        console.error("find_shop_method:", error.message);
        res.status(500).send("Server Error")
    }
};


const Shop = mongoose.model('shops', ShopSchema);

module.exports = Shop;
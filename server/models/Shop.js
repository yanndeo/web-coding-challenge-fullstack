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
   likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ] 


});


ShopSchema.index({location: "2dsphere" });


const Shop = mongoose.model('shops', ShopSchema);

module.exports = Shop;
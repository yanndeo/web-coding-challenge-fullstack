const mongoose =  require('mongoose');


const ShopSchema = new mongoose.Schema({

name:{
    type:String,
    required:true,
},

description:{
    type:Text,
    

}

})
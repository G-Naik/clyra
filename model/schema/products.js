const mongoose = require("mongoose");

const products = mongoose.Schema({
   id:{
    type:Number
   },
   title:{
    type:String
   },
   price:{
    type:Number
   },
   description:{
    type:String
   },
   image:{
    type:String
   },
   rating:{
    rate:{
        type:Number
    },
    count:{
        type:Number
    }
   }
})
module.exports = mongoose.model("product", products);
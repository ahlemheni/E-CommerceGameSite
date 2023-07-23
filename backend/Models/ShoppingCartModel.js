const mongoose = require('mongoose')
const UserSchema=require('./UserModel')

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  });
  
  const cartSchema = new mongoose.Schema({
    items: [cartItemSchema],
    totalprice: Number,
    delivery:{
        type:Boolean ,
        default:false
    },
    client:{
      type:Mongoose.Schema.types.ObjectId,
      ref :'User'
    }

    
  })
  
  module.exports=mongoose.model('ShoppingCart',cartSchema)
  module.exports=mongoose.model('Cartiem',itemSchema)
    
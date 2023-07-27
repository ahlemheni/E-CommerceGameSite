const mongoose = require('mongoose')
const shoppingcart = require('./ShoppingCartModel')
const user=require('./UserModel')
const orderSchema = new mongoose.Schema({
   
      shoppingcart: 
        {
          type: shoppingcart.schema,
          required:true
        },
      
      orderby: {
        type:user.schema,
        require:true
      },
      orderStatus: {
        type: Boolean,
        default:false
    },
        
            timestamps: true,
          

    })

module.exports=mongoose.model('Order',orderSchema)
const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
   
      address: {
        type: String,
        required: true
      },
      shoppingcart: [
        {
          type: mongoose.ObjectId,
          ref: "Shoppingcart",
        },
      ],
      orderby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      orderStatus: {
        type: Boolean,
    },
        
            timestamps: true,
          

    })
const mongoose = require('mongoose')
const GenreSchema = mongoose.Schema({
    name : {type : String , required : true }
      
})

const ProductSchema = mongoose.Schema({

    name : {
        type:String,
        required:true,
        unique:true
    },
    description : String,
    category:{
        type: String,
        enum : ['cosmetics', 'electronics', 'clothes']
         },
    qty : {
        type:Number ,
        required:true
    },
    image : String,
    game_title :String,
    price : Number,
    genre:GenreSchema
    
    



})
module.exports=mongoose.model('Product',ProductSchema)
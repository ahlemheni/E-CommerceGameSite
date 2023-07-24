const {cartModel,itemModel} = require('../Models/ShoppingCartModel')
const session = require('express-session');
const UserModel = require('../Models/UserModel');
const assert=require('assert')


module.exports.save = async (req, res) => {
        const { items,totalprice} = req.body;
         const client =req.session.username
        console.log(client) 
        const username=await UserModel.findOne({username:client})

        if(assert.equal(client,username.name,`Session isn't valid`))
       {
        try {
         
          const cartItems = [];
      
          for (const item of items) {
            const { product, quantity, price } = item;
            const productExists = await ProductModel.findById(product);
            if (!productExists) {
              return res.status(400).json({ error: 'Product not found' });
            }
            const cartItem = new itemModel({
              product,
              quantity,
              price,
            });
            cartItems.push(cartItem);
          }
      
          // Calculate the total price of the cart based on cart items
          let calculatedTotalPrice = 0;
          for (const item of cartItems) {
            calculatedTotalPrice += item.quantity * item.price;
          }
      
          // Check if the calculated total price matches the provided total price
          if (totalprice !== calculatedTotalPrice) {
            return res.status(400).json({ error: 'Total price does not match the sum of cart items' });
          }
      
          // Create a new cart document
          const cart = new cartModel({
            items: cartItems,
            totalprice,
            delivery,
            client,
          });
      
          // Save the cart to the database
          await cart.save();
      
          res.status(201).json(cart);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        }}
      };


module.exports.update = async (req,res) =>{

}
module.exports.deleteAll =  async (req,res)=>{
    //id passed is the shopping cart Id 
    const {_id} = req.body
    cartModel
    .findByIdAndDelete(_id)
    .then(()=>{res.status(201).send("cart has been emptied...")})
    .catch((err)=>{
            console.log(`Error while emptying the shopping cart :${err}`)
    })

}
module.exports.deleteOne =  async (req,res)=>{
    const { cartId, cartItemId } = req.body;

    try {
  
      const cart = await cartModel.findById(cartId);
  

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  

      const cartItemIndex = cart.items.findIndex(item => item.id === cartItemId);
  
      if (cartItemIndex === -1) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      cart.items.splice(cartItemIndex, 1);
  
      await cart.save();
  
      return res.status(200).json({ message: 'Cart item deleted successfully', cart });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

//admin 
module.exports.get =  async (req,res)=>{
    const cart = await cartModel.find()
    res.send(cart)
}
module.exports.findone= async(req,res)=>{
    const { id,username } = req.body;
    console.log(username, id);

   
    try {
    
        const shoppingcart = await cartModel.find({
            _id:id,
            client:username

        });
        console.log(shoppingcart);
        if (!shoppingcart) {
            res.status(404).json({ error: 'there is no shopping cart for this user' });
        } else {
            res.send(shoppingcart);
        }
        } catch (err) {
        return res.status(500).json({ err: 'Internal server error' });
        }

}
module.exports.findmany= async(req,res)=>{
    const {username } = req.body;
    console.log(username);

   
    try {
    
        const shoppingcart = await GenreModel.find({
            client:username
        });
        console.log(shoppingcart);
        if (!shoppingcart) {
            res.status(404).json({ error: 'there is no shopping cart for this user' });
        } else {
            res.send(shoppingcart);
        }
        } catch (err) {
        return res.status(500).json({ err: 'Internal server error' });
        }

}
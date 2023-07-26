const { ShoppingCart, CartItem} = require('../Models/ShoppingCartModel')
const session = require('express-session');
const UserModel = require('../Models/UserModel');
const assert=require('assert')
const ProductModel = require('../Models/ProductModel');

module.exports.save = async (req, res) => {
  const { items, totalprice, username, IdUser } = req.body;

  const client = username;
  // console.log(username);
  const user = await UserModel.findOne({ username: client });

  if (!user || client !== user.username) {
    return res.status(401).json({ error: "Session isn't valid" });
  }

  try {
    // Find the user's existing cart if it exists
    let cart = await ShoppingCart.findOne({ client: IdUser });

    if (!cart) {
      // If no cart exists, create a new one
      const cartItems = [];

      for (const item of items) {
        const { product,name, quantity, price } = item;
        const productExists = await ProductModel.findById(product);
        if (!productExists) {
          return res.status(400).json({ error: 'Product not found' });
        }
        const cartItem = new CartItem({
          product,
          name,
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
      cart = new ShoppingCart({
        items: cartItems,
        totalprice,
        client: IdUser, // Store the user's ID as the client for the cart
      });

    } else {
      // If cart exists, handle updating or adding new items
      for (const item of items) {
        const { product,name, quantity, price } = item;
        const existingItemIndex = cart.items.findIndex(cartItem => cartItem.product.toString() === product);
        if (existingItemIndex !== -1) {
          // If the item already exists in the cart, update it
          cart.items[existingItemIndex].quantity += quantity;
        } else {
          // If the item doesn't exist in the cart, create a new one
          const productExists = await ProductModel.findById(product);
          if (!productExists) {
            return res.status(400).json({ error: 'Product not found' });
          }
          const cartItem = new CartItem({
            product,
            name,
            quantity,
            price,
          });
          cart.items.push(cartItem);
        }
      }

      // Calculate the total price of the cart based on updated cart items
      cart.totalprice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
    }

    // Save the cart to the database or update the existing cart
    await cart.save();

    res.status(201).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports.update = async (req, res) => {
  const { cartItemId, quantity, cartId } = req.body;

  try {
    const cart = await ShoppingCart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItemIndex = cart.items.findIndex(item => item.id === cartItemId);

    if (cartItemIndex === -1) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    cart.items[cartItemIndex].quantity = quantity;

    await cart.save();

    cart.totalprice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports.deleteAll =  async (req,res)=>{
    //id passed is the shopping cart Id 
    const {_id} = req.body
    ShoppingCart
    .findByIdAndDelete(_id)
    .then(()=>{res.status(201).send("cart has been emptied...")})
    .catch((err)=>{
            console.log(`Error while emptying the shopping cart :${err}`)
    })

}
module.exports.deleteOne =  async (req,res)=>{
    const { cartId, cartItemId } = req.body;

    try {
  
      const cart = await ShoppingCart.findById(cartId);
  

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  

      const cartItemIndex = cart.items.findIndex(item => item.id === cartItemId);
  
      if (cartItemIndex === -1) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      cart.items.splice(cartItemIndex, 1);
      cart.totalprice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

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
module.exports.findmany = async (req, res) => {
  const { IdUser } = req.query;

  try {
    const shoppingcart = await ShoppingCart.findOne({
      client: IdUser,
    }); // Populate the product field of items with only _id and name

    if (!shoppingcart) {
      return res.status(404).json({ error: 'There is no shopping cart for this user' });
    }

    // Extract the product IDs from the shopping cart items
    res.send({ shoppingcart });

  } catch (err) {
    return res.status(500).json({ err: 'Internal server error' });
  }
};

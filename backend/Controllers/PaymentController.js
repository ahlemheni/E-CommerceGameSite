require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { ShoppingCart } = require('../Models/ShoppingCartModel');
const UserModel=require("../Models/UserModel")

module.exports.checkout = async (req, res) => {
  const { CardId } = req.params;
  try {
    const shoppingCart = await ShoppingCart.findOne({ _id: CardId });
    if (!shoppingCart) {
      return res.status(404).json({ error: 'Shopping cart not found' });
    }
    const user = await UserModel.findById(shoppingCart.client);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    const amount = shoppingCart.totalprice;
    const userid =user._id;
    const email =user.email;

    const { id } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'USD',
        description: 'Company description',
        payment_method: id,
        confirm: true,
        customer: userid, // Pass the customer ID here

        metadata: {
            email: email, // Include the email in the metadata
          },
      });

      if (paymentIntent.status === 'succeeded') {
        // Payment was successful
        res.json({
          message: 'Payment successful',
          success: true,
        });
      } else {
        // Payment failed for some reason
        res.status(500).json({ error: 'Payment failed' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

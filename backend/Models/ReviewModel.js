const mongoose = require('mongoose');
require('./ProductModel')

const reviewSchema = new mongoose.Schema(
    {
  productId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Product', required: true 
    },
  rating: { type: Number, required: true },

    }
    );

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

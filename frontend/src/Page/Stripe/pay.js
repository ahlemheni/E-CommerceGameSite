// CheckoutForm.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export const CheckoutForm = ({ CardId }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  console.log(CardId)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log('Token generated ', paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(`http://localhost:5000/checkout/${CardId}`, {
          id: id,
        });

        if (response.data.success) {
          console.log('Payment successful');
          /*  navigate('/PaymentSuccess') */
        } else {
          console.log('Payment failed');
          /*  navigate('/PaymentFailed') */
        }
      } catch (error) {
        console.log('Payment failed', error);
      }
    } else {
      console.log('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '200px 0px' }}>
      <CardElement options={{ hidePostalCode: true }} />
      <button type="Submit">Pay</button>
    </form>
  );
};

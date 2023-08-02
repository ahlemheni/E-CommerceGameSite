import React  from "react";   
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from "./pay";
import { useParams } from 'react-router-dom';

const PUBLIC_KEY ="pk_test_51NaQ9wA9SYL8ETsWnkhhqHiszqV2dI3OoiCTzUvxFk22Q4DP9HhFQpL1tfqQRL34wZKwEQSV74NQes6YTEduJ0Vx00NIn64Eiz"
const stripeTestPromise=loadStripe(PUBLIC_KEY)
const  Stripe=()=>{
    const { CardId } = useParams();

  return (
    <Elements stripe={stripeTestPromise}>
 <CheckoutForm CardId={CardId} />
    </Elements>
  );
}
export default Stripe;
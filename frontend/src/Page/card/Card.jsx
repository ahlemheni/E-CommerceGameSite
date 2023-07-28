import './card.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../Components/spinner/spinner";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useCookies } from 'react-cookie';

import { Link } from 'react-router-dom';
const Card = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [CardId, setCardId] = useState(); // Default quantity

  const [quantity, setQuantity] = useState(); // Default quantity
  const [ShoppingCart, setShoppingCart] = useState([]); // Initialize as an empty array, not an object
  const [totalPrice, setTotalPrice] = useState(0); // Initialize total price as 0
  const [cookies] = useCookies();
  const fetchShoppingCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cart/user', { params: { IdUser: cookies.id } });
      setIsLoading(false);
      console.log(response.data);
      setCardId(response.data.shoppingcart._id);
      setShoppingCart(response.data.shoppingcart.items);
      setTotalPrice(response.data.shoppingcart.totalprice);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
 
  
    fetchShoppingCart();
  }, [cookies.id]);
  
 

  const handleIncrement = async (cartItemId) => {

    try {
      // Find the cart item in the ShoppingCart array by its ID
      const cartItem = ShoppingCart.find(item => item._id === cartItemId);

      cartItem.quantity += 1;

      const response = await axios.post('http://localhost:5000/cart/update', {
        cartItemId: cartItemId,
        quantity: cartItem.quantity,
        cartId: CardId, 
      });

      setShoppingCart(response.data.items);
      setTotalPrice(response.data.totalprice);
    } catch (error) {
      console.error(error);
    }

  };

  const handleDecrement = async (cartItemId) => {

    try {
      // Find the cart item in the ShoppingCart array by its ID
      const cartItem = ShoppingCart.find(item => item._id === cartItemId);
  
      // Check if the quantity is greater than 0 before decrementing
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
  
        const response = await axios.post('http://localhost:5000/cart/update', {
          cartItemId: cartItemId,
          quantity: cartItem.quantity,
          cartId: CardId, 
        });

        setShoppingCart(response.data.items);
        setTotalPrice(response.data.totalprice);
      }
    } catch (error) {
      console.error(error);
    }

  };
  const deleteone = async (cartItemId) => {
    setIsLoading(true);

    try {
       await axios.post('http://localhost:5000/cart/deleteone', {
        cartItemId: cartItemId,
        cartId: CardId, 
      });
  
      if (ShoppingCart.length  > 0) {

        alert("Product removed from Cart");
        fetchShoppingCart()

      } else {

        setShoppingCart([]);
        setTotalPrice(0);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);

  };
  
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <section>
          <div className="container">
          <div className="row">
          <div className="page-content">
          <div className="mainbanner">
            <img src='./assets/images/GameBanner.jpg' alt='' />
            </div>
            </div>
            </div>
          </div>
          <div className="container">
            <div className="page-content">
              <MDBContainer>
                <MDBRow className="justify-content-center align-items-center h-100">
                  <MDBCol md="10">
                    <h1 className="mb-4" style={{ color: 'rgba(105, 255, 235, 0.593)', textAlign: 'center', fontFamily: 'Comic Sans MS' }}>
                      <MDBIcon fas icon="shopping-basket" /> Shopping <span style={{ color: '#fff' }}>Cart</span>
                    </h1>

                    { ShoppingCart && ShoppingCart.length > 0 ?(
                      ShoppingCart.map((item, index) => (
                        <>
                        <MDBCard className="rounded-3 mb-4" key={index}>
                          <MDBCardBody className="p-4">
                            <MDBRow className="justify-content-between align-items-center">
                              <MDBCol md="2" lg="2" xl="2">
                                <MDBCardImage className="rounded-3" fluid
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                  alt="Cotton T-shirt"
                                />
                              </MDBCol>
                              <MDBCol md="3" lg="3" xl="3">
                                <p className="lead fw-normal mb-2">{item.name}</p>
                                <p>
                                  <span className="text-muted">Price: </span>{item.price}
                                </p>
                              </MDBCol>
                              <MDBCol md="3" lg="3" xl="2" className="d-flex align-items-center justify-content-around">
                              <button className="btn" onClick={() => handleDecrement(item._id)}>
                                  <MDBIcon fas icon="minus" />
                                </button>
                                <MDBInput min={0} value={item.quantity} type="number" size="sm" onChange={(e) => setQuantity(parseInt(e.target.value))} />
                                <button className="btn" onClick={() => handleIncrement(item._id)}>
                                  <MDBIcon fas icon="plus" />
                                </button>
                              </MDBCol>
                              <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                                <MDBTypography tag="h5" className="mb-0">
                                  {item.totalprice}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="1" lg="1" xl="1" className="text-end">
                                <button  className="btn" onClick={() => deleteone(item._id)}>
                                  <MDBIcon fas icon="trash text-danger" size="lg" />
                                </button>
                              </MDBCol>
                            </MDBRow>
                          </MDBCardBody>
                        </MDBCard>
                       
                          </>
                      ))
                 
                    ) : (
                      <div className="text-center">
                        <p className="lead">Your shopping cart is empty.</p>
                        <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
                      </div>
                    )}

{ShoppingCart && ShoppingCart.length > 0 && (
                      <MDBCard className="mb-5">
                        <MDBCardBody className="p-4">
                          <div className="d-flex justify-content-between">
                            <button className="btn" style={{ backgroundColor: '#FF5DBF5E', borderRadius: 30, fontSize: "16px" }}>
                              <MDBIcon icon="angle-double-left" className="me-2" /> <Link to="/shop" className="lead fw-normal" style={{ color: "black" }}>Back to shopping</Link>
                            </button>
                            <button className="btn" style={{ backgroundColor: "rgba(17, 238, 28, 0.453)", borderRadius: 30, fontSize: "16px" }}>
                              <span className="lead fw-normal">{totalPrice}</span> / <MDBIcon icon="credit-card" className="me-2" /><Link to="/Pay" className="lead fw-normal" style={{ color: "black" }}>Buy Now</Link>
                            </button>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    )}

                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
          </div>

        </section>
      )}
    </>
  );
};
export default Card
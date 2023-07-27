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
  const [cookies,setCookie] = useCookies();


  const fetchShoppingCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cart/user', { params: { IdUser: cookies.id } });
      setIsLoading(false);
      console.log(response.data);
      setCardId(response.data.shoppingcart._id);
      setShoppingCart(response.data.shoppingcart.items);
      setTotalPrice(response.data.shoppingcart.totalprice);

      const totalItems = response.data.shoppingcart.items.length;
      setCookie('cartItemsCount', totalItems);

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

      const cartItem = ShoppingCart.find((item) => item._id === cartItemId);

      const productResponse = await axios.get('http://localhost:5000/product/one', { params: { id: cartItem.product } });
      const productQty = productResponse.data.qty;
  console.log(productQty)
      // const updatedQuantity = productQty - 1; // Decrement quantity by 1
      //  await axios.post('http://localhost:5000/product/update', {
      //   _id: cartItem.product,
      //   qty: updatedQuantity,
      // });
      // Find the cart item in the ShoppingCart array by its ID
      if (cartItem.quantity < productQty) {

      cartItem.quantity += 1;

      const response = await axios.post('http://localhost:5000/cart/update', {
        cartItemId: cartItemId,
        quantity: cartItem.quantity,
        cartId: CardId, 
      });

      setShoppingCart(response.data.items);
      setTotalPrice(response.data.totalprice);
    }else{
      alert("You have reached maximum limit of this Product")

    }
  } catch (error) {
    console.error(error);
  }

  };

  const handleDecrement = async (cartItemId) => {

    try {
      // Find the cart item in the ShoppingCart array by its ID
      const cartItem = ShoppingCart.find(item => item._id === cartItemId);
      // const productResponse = await axios.get('http://localhost:5000/product/one', { params: { id: cartItem.product } });
      // const productQty = productResponse.data.qty;


      // Check if the quantity is greater than 0 before decrementing
      if (cartItem.quantity > 1) {
        
        // const updatedQuantity = productQty + 1; // Decrement quantity by 1
        // await axios.post('http://localhost:5000/product/update', {
        //   _id: cartItem.product,
        //   qty: updatedQuantity,
        // });
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
          
          <div className="container">
          <div className="row">
        <div className="col-lg-12">
        <div className="page-content" style={{backgroundImage: "url('./assets/images/top-view-black-friday-sales-assortment-with-copy-space.jpg')",  backgroundSize: "cover", backgroundRepeat: "no-repeat",backgroundPosition: "center",}}>
          
              <MDBContainer style={{backgroundColor:"rgba(255,255,255,0.3086484593837535)",borderRadius:"10%"}}>
                <MDBRow className="justify-content-center align-items-center h-100">
                  <MDBCol md="10">
                  <br/>
                    <h1 className="mb-4" style={{ color: 'rgba(255,101,182,0.8380602240896359)', textAlign: 'center', fontFamily: 'Comic Sans MS' }}>
                      <MDBIcon fas icon="shopping-basket" /> Shopping <span style={{ color: '#fff' }}>Cart</span>
                    </h1>

                    { ShoppingCart && ShoppingCart.length > 0 ?(
                      ShoppingCart.map((item, index) => (
                        <>
                        <MDBCard className="rounded-5 mb-1" key={index} style={{backgroundColor:"rgba(0,0,0,0.7008053221288515)"}}>
                          <MDBCardBody className="p-3">
                            <MDBRow className="justify-content-between align-items-center">
                              <MDBCol md="1" lg="1" xl="2">
                                <MDBCardImage className="rounded-3" fluid
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                  alt="Cotton T-shirt"
                                />
                              </MDBCol>
                              <MDBCol md="2" lg="2" xl="3">
                                <p className="lead fw-normal mb-3" style={{ color: 'rgba(255,101,182,0.8380602240896359)', fontFamily: 'Comic Sans MS',fontSize:"25px" }}>{item.name}</p>
                                <p style={{  color: 'rgba(255,255,255,0.7512254901960784)',fontFamily: 'Comic Sans MS',fontSize:"15px",fontWeight:"bold" }}>
                                  <span style={{  color: '#fff',fontFamily: 'Comic Sans MS',fontSize:"15px" }}>Price/U : </span>{item.price} $
                                </p>
                              </MDBCol>
                              <MDBCol md="1" lg="1" xl="2" className="d-flex align-items-center justify-content-around">
                              <button className="btn btn-outline-primary btn-sm" onClick={() => handleDecrement(item._id)}>
                                  <MDBIcon fas icon="minus" />
                                </button>
                                <MDBInput style={{  fontFamily: 'Comic Sans MS',fontSize:"15px",textAlign:"center" }} min={0} value={item.quantity} type="number" size="sm" onChange={(e) => setQuantity(parseInt(e.target.value))} />
                                <button className="btn btn-outline-primary btn-sm" onClick={() => handleIncrement(item._id)}>
                                  <MDBIcon fas icon="plus" />
                                </button>
                              </MDBCol>
                            
                              <MDBCol md="1" lg="1" xl="4" className="text-end">
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
                      <div className="text-center mb-3">
                        <p className="lead" style={{ color: '#fff' ,fontFamily: 'Comic Sans MS'}}>Your shopping cart is empty. <MDBIcon far icon="frown" /></p>
                        <Link to="/shop" className="btn btn-outline-info"style={{  borderRadius: 30, fontSize: "18px"}}> <MDBIcon fas icon="cart-plus" /> Start Shopping <MDBIcon far icon="smile-wink" /></Link>
                      </div>
                    )}

{ShoppingCart && ShoppingCart.length > 0 && (
                      <MDBCard className="mb-5" style={{backgroundColor:"rgba(0,0,0,0.6055672268907564)"}}>
                        <MDBCardBody className="p-4" >
                          <div className="d-flex justify-content-between">
                            <button className="btn btn-outline-dark" style={{  borderRadius: 30, fontSize: "16px" ,color: 'rgba(255,255,255,0.7512254901960784)'}}>
                              <MDBIcon icon="angle-double-left" className="me-2" /> <Link to="/shop" className="lead fw-normal" style={{ color: "rgba(255,255,255,0.7512254901960784)" }}>Back to shopping <MDBIcon fas icon="shopping-cart" /></Link>
                            </button>
                            <button className="btn btn-outline-success" style={{  borderRadius: 30, fontSize: "20px", color: 'rgba(255,255,255,0.7512254901960784)' }}>
                              <span className="lead fw-normal">Total: {totalPrice} $</span> / <MDBIcon icon="credit-card" className="me-2" />Buy Now <MDBIcon  icon="angle-double-right" />
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
          </div>
          </div>
      )}
    </>
  );
};
export default Card
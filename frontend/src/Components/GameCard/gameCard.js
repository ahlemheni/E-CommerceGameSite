import React, {  useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { MDBIcon } from 'mdb-react-ui-kit';
import Details from '../../Page/Details';

export default function GameCard(props) {
  const [cookies,setCookie] = useCookies();
  const [quantity, setQuantity] = useState(1); // Initial quantity set to 1
  const [modalShow,setModalShow]=useState(false)

  const navigate = useNavigate();
 

  const updateQuantity = (newQuantity) => {
    setQuantity(newQuantity);
  };
  const fetchShoppingCart = async () => {
    if (cookies.id) {
    try {

      const response = await axios.get('http://localhost:5000/cart/user', { params: { IdUser: cookies.id } });
     
      const totalItems = response.data.shoppingcart.items.length;

      setCookie('cartItemsCount', totalItems, { path: '/' });

    } catch (error) {
      console.error(error);
    }
  }
  };
  useEffect(() => {
 
  
    fetchShoppingCart();
  }, [cookies.cartItemsCount]);
  const addToCart = async (productId) => {
    try {
      
  
      // const updatedQuantity = props.game.qty - 1; // Decrement quantity by 1
  
      // // Update the product quantity on the server
      //  await axios.post('http://localhost:5000/product/update', {
      //   _id: productId,
      //   qty: updatedQuantity,
      // });
  
      // Check if the product quantity was successfully updated
        const response = await axios.post('http://localhost:5000/cart/save', {
          items: [
            {
              product: productId,
              name: props.game.name,
              quantity: quantity,
              price: props.game.price,
            },
          ],
          totalprice: props.game.price * quantity,
          username: cookies.username,
          IdUser: cookies.id,
        });
  
        console.log(response.data); // This will log the cart data returned from the server
  
        alert('New product added to Shopping Cart successfully!');
        fetchShoppingCart();
    
    } catch (error) {
      if (!cookies.id) {
        alert('Connect to your account is required.');
        navigate('/Login');
      } else {
        console.error('Error adding item to cart:', error);
        alert('Failed to add item to cart. Please try again.');
      }
    }
  };



  return (
    
    <div className="col-4">

    <div className="item">
      <div className="thumb">
        <img src="assets/images/trending-01.jpg" alt="" />
        <span className="price">
          <em>$36</em>
          {props.game.price}$
        </span>
      </div>
      <div className="down-content">
        <span className="category">{props.game.category}</span>
        <h4>{props.game.name}</h4>

        <button  class="btn btn-outline-warning "  style={{  borderRadius:30,fontWeight:"bold"}}onClick={() => setModalShow(true)} >
        <MDBIcon fas icon="info-circle" /> Details
    </button>
        {props.game.qty === 0 ? (
             <span style={{ color: 'red', fontWeight: 'bold', marginLeft: '20px' }}>
               Out of Stock
           </span>      
             ) : (
            <Link onClick={() => addToCart(props.game._id)}>
              <i className="fa fa-shopping-bag"></i>
            </Link>
          )}

        
  

    <Details name={props.game.name} 
    price={props.game.price} 
    game_name={props.game.game_title} 
    cat={props.game.category} 
    qte={props.game.qty} 
    desc={props.game.description}
    genre={props.game.genre}
    image={props.game.image}
    game={props.game}
review={props.reviews}
quantity={quantity} // Pass the quantity to the Details component
updateQuantity={updateQuantity} // Pass the updateQuantity function as a prop

    addToCart={addToCart} 
      show={modalShow}
      onHide={() => setModalShow(false)}
    />
          {/*<summary>Details</summary>
          <p className="text-primary">
            {props.game.name} - {props.game.id}
          </p>
          <p>
            Price : <span className="text-dark">{props.game.price}</span>
          </p>
          <p>
            Game ID: <span className="text-dark">{props.game._id}</span>
          </p>
          <p>
            Genre: <span className="text-dark">{props.game.category}</span>
          </p>
          {Array.isArray(props.game.tags) && props.game.tags.length > 0 && (
            <div>
              <p>Multi-tags:</p>
              <ul className="p-0 m-0 d-flex">
                {props.game.tags.map((i) => (
                  <li>{i},</li>
                ))}
              </ul>
            </div>
          )}
                </details>*/}
      </div>
    </div>
  </div>
);
} 


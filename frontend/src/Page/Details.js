import React, {  useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import './Details.css' 
import { MDBIcon,MDBCol,MDBInput } from 'mdb-react-ui-kit';




const Details = (props,detail) => { 
  const [localQuantity, setLocalQuantity] = useState(props.quantity);
  const handleIncrement = () => {
    if (localQuantity < props.qte) {

    setLocalQuantity((prevQuantity) => prevQuantity + 1);
    props.updateQuantity(localQuantity + 1); // Update the quantity in GameCard
  }
  };
  
  const handleDecrement = () => {
    if (localQuantity > 1) {
      setLocalQuantity((prevQuantity) => prevQuantity - 1);
      props.updateQuantity(localQuantity - 1); // Update the quantity in GameCard

    }
  };
const handleAddToCart = () => {
    props.addToCart(props.game._id);
    props.onHide(); // Hide the modal after adding to cart
  };


  return (
    <div style={{ backgroundColor:"rgba(0,0,0,0.11537114845938379)"}} >
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        
     
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <MDBIcon fas icon="info-circle" /> Details of {props.name} 
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className='body' >
        <div className='main'> 
                <div className='img-container'>  
                <img src="assets/images/trending-01.jpg" alt='product image' /> 

                </div> 
                <div className='product-details-container'> 
                <p>Name : <span>{props.name}</span></p> 
                <p>descr:<span>{props.desc}</span></p> 
                <p>category :<span>{props.cat}</span></p> 
                <p>game title :<span>{props.game_name}</span></p> 
                <p>price :<span>{props.price} $</span></p> 
                <p>ID :<span>{props.genre}</span></p>  
                
                <p> Rating :<span>{props.review} <MDBIcon far icon="star" /></span></p>  

                <p>
                Availablity:{" "}
              <span style={{ color: props.qte === 0 ? ' red' : 'green' }}>
                {props.qte === 0 ? "Out of Stock" : "	In stock"}
              </span>
              </p>  
                  
                
            {props.qte === 0 ? (
        <></>
             ) : (
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">

              <MDBCol  className="d-flex align-items-center justify-content-around">
              <button className="btn btn-outline-primary btn-sm" onClick={handleDecrement}>
                  <MDBIcon fas icon="minus" />
                </button>
                <MDBInput style={{  fontFamily: 'Comic Sans MS',fontSize:"15px",textAlign:"center" }} readOnly value={localQuantity} type="number" size="sm"  onChange={(e) => setLocalQuantity(parseInt(e.target.value))} />
                <button className="btn btn-outline-primary btn-sm" onClick={handleIncrement}>
                  <MDBIcon fas icon="plus" />
                </button>
              </MDBCol> 

              <button className="btn btn-outline-success" onClick={handleAddToCart}>
              <i className="fa fa-shopping-bag"></i> Add To Cart
            </button>
            </div>

          )}

                </div>
        
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default Details


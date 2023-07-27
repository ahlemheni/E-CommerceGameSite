import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import './Details.css' 




const Details = (props,detail) => { 
  
const handleAddToCart = () => {
    props.addToCart(props.game._id);
    props.onHide(); // Hide the modal after adding to cart
  };


  return (
    <div>
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.name} details
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
                <p>
              Disponibilité:{" "}
              <span style={{ color: props.qte === 0 ? ' red' : 'green' }}>
                {props.qte === 0 ? "Non disponible" : "Disponible"}
              </span>
              </p>  
             {/* <label htmlFor='product-quantity'>achat quantity : </label><input type='number' className='product-quantity' id='product-quantity'/> */}
                  
                  <button className="btn btn-outline-success" onClick={handleAddToCart}>
              Add To Cart
            </button>

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


import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import image from '../logo.svg' 
import './Details.css' 
import shop from './Shop' 
import { Link } from 'react-router-dom';  
import GameCard from '../Components/GameCard/gameCard';




const Details = (props,detail) => { 
  
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
      <Modal.Body className='body'>
        <div className='main'> 
                <div className='img-container'>  
                <img src={props.image} alt='product image' /> 

                </div> 
                <div className='product-details-container'> 
                <p>name : {props.name}</p> 
                <p>descr:{props.desc}</p> 
                <p>category :{props.cat}</p> 
                <p>game title :{props.game_name}</p> 
                <p>price :{props.price}</p> 
                <p>gendre :{props.genre}</p>  
                <p>avaible Quantity : {props.qte}</p>
                  <label htmlFor='product-quantity'>achat quantity : </label><input type='number' className='product-quantity' id='product-quantity'/>
                  <br />
                  <br/> 
                  <Link onClick={() => GameCard.addToCart(props.game._id)}>
            <button className='btn-primary'>Add To Cart</button>
          </Link>
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

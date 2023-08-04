import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {
  MDBTable, MDBTableHead, MDBTableBody ,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    MDBCardImage,

  } from "mdb-react-ui-kit";
  import { Modal, Button } from 'react-bootstrap';

function History() {
  const [ShoppingCart, setShoppingCart] = useState([]);
  const [totalcard, settotalcard] = useState(0);
  const [cookies, setCookie] = useCookies([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const handle = (transactionId) => {
    setSelectedTransactionId(transactionId);

    setShowModal(true);

  };
  const handleCloseModal = () => {
        setShowModal(false);

  }
  const fetchShoppingCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cart/history', {
        params: { IdUser: cookies.id },
      });

      const paidShoppingHistory = response.data.filter((item) => item.PayStatus === true);
      setShoppingCart(paidShoppingHistory);
      console.log(paidShoppingHistory);

    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchShoppingCart();
  }, []);

  return (
    <>
          <div className="table-responsive">

    <MDBTypography
                  tag="h1"
                  className="mb-5 pt-2 text-center fw-bold text-uppercase"
                  style={{fontFamily:"cursive",color:"rgba(213,11,107,0.7148109243697479)"}}
                >
                 <MDBIcon fas icon="file-invoice-dollar" /> My History
                </MDBTypography>
   
      {ShoppingCart.length === 0 || ShoppingCart.PayStatus===false ? (
          <div className='d-grid gap-2 col-12 mx-auto'>
          <MDBTypography
       tag="h6"
       className="mb-5 pt-2 text-center fw-bold text-uppercase"
       style={{fontFamily:"cursive",color:"#fff"}}
     >
       <MDBIcon far icon="frown" /> Your history is empty . Start shopping now 
     </MDBTypography>
         <button className="btn btn-outline-warning mx-auto "style={{ backgroundColor: '#FF5DBF5E' ,marginBottom:20 , borderRadius:30,color: 'rgba(244, 240, 170, 0.61)',fontSize:"16px"}} onClick={() => window.location = '/shop'}>
           Go to Shop <MDBIcon fas icon="shopping-cart" />
         </button>
       </div>
         ) : (
          
          <MDBTable striped  > 
  
            <MDBTableHead className='table-light' >
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>id</th>
                <th scope='col'>location</th>
                <th scope='col'>totalprice</th>
                <th scope='col'>Details</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody style={{border:"20px"}} > 
              {ShoppingCart.map((item, index) => (
                

                  <tr key={item._id} >
                    <th scope='row'>{index + 1}</th>
                    <td>{item._id}</td>
                    <td>{item.location}</td>
                    <td>${item.totalprice}</td>
                    <td className='mx-auto d-flex justify-content-center'>
                      <button className="btn btn-outline-info" style={{ borderRadius: 30, fontSize: "16px" }}   onClick={() => handle(item._id)}>
                        <MDBIcon fas icon="info-circle" /> More Details
                      </button>
                        <Modal show={showModal} onHide={handleCloseModal}>
                              <Modal.Header >
                                <Modal.Title><MDBIcon fas icon="user-edit" /> Details of Card</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                              {ShoppingCart.map((item) => {
  return item.items.length > 0 && item._id === selectedTransactionId ? (
    item.items.map((cartItem) => (
      <div className="d-flex align-items-center my-3 mx-auto" key={cartItem._id}>
        <div className="flex-shrink-0 me-4">
          <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp"
            fluid
            style={{ width: "150px" }}
            alt="Generic placeholder image"
          />
        </div>
        <div className="d-flex flex-column">
          <MDBTypography tag="h5" className="text-primary mb-2">
            {cartItem.name}
          </MDBTypography>
          <div className="d-flex align-items-center">
            <p className="fw-bold mb-0 me-2">
              <MDBIcon fas icon="dollar-sign" /> Price/U: {cartItem.price} $
            </p>
            <p className="fw-bold mb-0 me-5">Quantity: {cartItem.quantity}</p>
          </div>
        </div>
      </div>
    ))
  ) : null;
})}

        </Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                <MDBIcon far icon="times-circle" /> Close
                                </Button>
                              
                              </Modal.Footer>
                            </Modal>
    
 
                    </td>
                  </tr>
              
              ))}
            </MDBTableBody>
          </MDBTable>
        )}
             </div>

    </>
  );
}

export default History;

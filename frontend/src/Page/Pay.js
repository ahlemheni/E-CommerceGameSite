import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBRadio,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon
} from "mdb-react-ui-kit";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Pay() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.currentTarget.value);
  };
  const [CardType,setCardType] = useState("visa")
  const handleCardTypeChange = (e) =>{
    setCardType(e.currentTarget.value);
  }

  return (
    
    <div className="container">
    <div className="row">
  <div className="col-lg-12">
      <div className="page-content">
      <button    className="btn btn-danger " style={{ backgroundColor: '#e75e8e5b',  borderRadius: 30, fontSize: "20px", color: 'rgba(255,255,255,0.7512254901960784)' }}>
       <Link style={{ color: "rgba(255,255,255,0.7512254901960784)" }} to="/Card" ><MDBIcon  icon="angle-double-left" /> Go back </Link>

         </button>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol md="8" className="mb-4">
              <MDBCard className="mb-4">
                <MDBCardHeader className="py-3" style={{ backgroundColor: "#DB7093" }}>
                  <h5 className="mb-0">Payment</h5>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <h6>Username</h6>
                      <MDBInput  id="" type="text" />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <h6>Address</h6>
                      <MDBInput
                        
                        id="form2"
                        type="text"
                        placeholder="75 Street London NW5 9XE England"
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr className="my-4" />
                  <h5 className="mb-4">Payment Method</h5>
                  <MDBRadio
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    label="Cash delivery"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={handlePaymentMethodChange}
                  />
                  <MDBRadio
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    label="Credit card"
                    value="credit-card"
                    checked={paymentMethod === "credit-card"}
                    onChange={handlePaymentMethodChange}
                  />
                  <br />

                  {paymentMethod === "credit-card" && (
                    <>
                     <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "40px" }}>
          <FaCcVisa size={50} />
          <label htmlFor="visaOption">
            <input
              type="radio"
              id="visaOption"
              value="visa"
              checked={CardType === "visa"}
              onChange={handleCardTypeChange}
            />
            Visa
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "40px" }}>
          <FaCcMastercard size={50} />
          <label htmlFor="mastercardOption">
            <input
              type="radio"
              id="mastercardOption"
              value="mastercard"
              checked={CardType === "mastercard"}
              onChange={handleCardTypeChange}
            />
            Mastercard
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "40px" }}>
          <FaPaypal size={50} />
          <label htmlFor="paypalOption">
            <input
              type="radio"
              id="paypalOption"
              value="paypal"
              checked={CardType === "paypal"}
              onChange={handleCardTypeChange}
            />
            Paypal
          </label>
        </div>
      </div>
    </div>
  
                      <MDBRow>
                        <MDBCol>
                          <h6>Card Name</h6>
                          <MDBInput
                            
                            id="form6"
                            type="text"
                            wrapperClass="mb-4"
                            placeholder="John Deo"
                          />
                        </MDBCol>
                        <MDBCol>
                          <h6>Card Number</h6>
                          <MDBInput
                            
                            id="form7"
                            type="text"
                            wrapperClass="mb-4"
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md="3">
                          <h6>Expiration</h6>
                          <MDBInput
                            
                            id="form8"
                            type="text"
                            wrapperClass="mb-4"
                            placeholder="MM/YY"
                          />
                        </MDBCol>
                        <MDBCol md="3">
                          <h6>CVV</h6>
                          <MDBInput
                            
                            id="form8"
                            type="text"
                            wrapperClass="mb-4"
                          />
                        </MDBCol>
                      </MDBRow>
                    </>
                  )}

                  <MDBBtn size="lg-5" style={{ backgroundColor: "#DB7093"  }}>
                    Continue to checkout
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="4" className="mb-4">
              <MDBCard className="mb-4">
                <MDBCardHeader className="py-3" style={{ backgroundColor: "#DB7093" }}>
                  <h5 className="mb-0">Summary</h5>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBListGroup flush>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>$53.98</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Shipping
                      <span>Gratis</span>
                    </MDBListGroupItem>
                    <hr className="my-2"></hr>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0">(including VAT)</p>
                        </strong>
                      </div>
                      <span>
                        <strong>$53.98</strong>
                      </span>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
    </div>
    </div>

  );
}
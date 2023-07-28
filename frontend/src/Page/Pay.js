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
} from "mdb-react-ui-kit";

export default function App() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.currentTarget.value);
  };

  return (
    <div className="container-pay">
      <div className="page-content">
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
  );
}

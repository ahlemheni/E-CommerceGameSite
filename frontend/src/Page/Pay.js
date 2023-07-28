import React from "react";
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
} 




from "mdb-react-ui-kit";

export default function App() {
  return (
    <div className="container-pay">
<div className="page-content">
    <MDBContainer className="py-5" >
      <MDBRow>
        <MDBCol md="8" className="mb-4" >
          <MDBCard className="mb-4">
            <MDBCardHeader className="py-3" style={{ backgroundColor: "#DB7093" }}>
              <h5 className="mb-0">Payment</h5>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBInput label="User name" id="form1" type="text"  />
                </MDBCol>

                <MDBCol>
                  <MDBInput label="Address" id="form2" type="text" placeholder="75 Street London NW5 9XE England"/>
                </MDBCol>
              </MDBRow>
              <hr className="my-4" />
              <h5 className="mb-4">Payment Method</h5>
                 <hr className="my-4" />
            
              
              <MDBRadio
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="Cash delivery"
              />
             
               <MDBRadio
                name="flexRadioDefault"
                id="flexRadioDefault1"
                label="Credit card"
                checked
                
                
               
              />
              <br/>


              <MDBRow>
                <MDBCol>
                  <MDBInput
                    label="Name on card"
                    id="form6"
                    type="text"
                    wrapperClass="mb-4"
                    placeholder="John Deo"
                  />
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    label="Card Number"
                    id="form7"
                    type="text"
                    wrapperClass="mb-4"
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="3">
                  <MDBInput
                    label="Expiration"
                    id="form8"
                    type="text"
                    wrapperClass="mb-4"
                    placeholder="MM/YY"
                  />
                </MDBCol>
                <MDBCol md="3">
                  <MDBInput
                    label="CVV"
                    id="form8"
                    type="text"
                    wrapperClass="mb-4"
                  />
                </MDBCol>
              
                
              <MDBBtn size="lg-5" style={{ backgroundColor: "#DB7093" }}>
                Continue to checkout
              </MDBBtn>
              
              </MDBRow>
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
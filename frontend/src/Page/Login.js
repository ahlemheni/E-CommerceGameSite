import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';

function Login() {
  const emailOrUsername = useRef();
  const password = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = () => {
    if (!emailOrUsername.current.value || !password.current.value) {
      setErrorMessage('All fields are required.');
      return;
    }

   
    const loginData = {};

    if (emailOrUsername.current.value.includes('@')) {
      loginData.email = emailOrUsername.current.value;
    } else {
      loginData.username = emailOrUsername.current.value;
    }
  
    loginData.password = password.current.value;
    axios
      .post('http://localhost:5000/signIn', loginData)
      .then(function (response) {
        const { token, user } = response.data;

        if (token && user) {
          alert('Welcome, ' + user.username);
          window.location.replace('/' + user._id);

        }
      })
      .catch((error) => {
        if (error.response) {
          const { message } = error.response.data;
          setErrorMessage(message);
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="page-content">
            <h1 style={{ color: '#a06177' }}>Welcome back, you've been missed!</h1>

            <MDBContainer fluid className="p-3 my-4">
              <MDBRow>
                <MDBCol col="5" md="5">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
                    className="img-fluid"
                   
                  />
                </MDBCol>
                <MDBCol col="7" md="6"style={{ marginTop:"100px" }}>
                  <div className="mb-4">
                    <label htmlFor="emailInput" className="form-label custom-label mb-2" style={{ color: '#e75e8d',fontSize:"20px" }}><MDBIcon icon="envelope" className="me-2" /> Email address :</label>
                    <MDBInput
                      id="emailInput"
                      type="email"
                      size="lg"
                      icon="envelope"
                      iconClass="text-primary"
                      placeholder="Enter your email"
                      ref={emailOrUsername}
                      style={{ backgroundColor:"#e8d3d8" ,borderRadius:"25px"}}

                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="passwordInput" className="form-label custom-label mb-2" style={{ color: '#e75e8d',fontSize:"20px" }}><MDBIcon icon="lock" className="me-2"/>Password :</label>
                    <MDBInput
                      id="passwordInput"
                      type="password"
                      size="lg"
                      icon="lock"
                      iconClass="text-primary"
                      placeholder="Enter your password"
                      ref={password}
                      style={{ backgroundColor:"#e8d3d8" ,borderRadius:"25px"}}

                    />
                  </div>
                  {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                  <div className="d-flex justify-content-between mx-4 mb-4">
                    <Link to="/forgot-password">Forgot password?</Link>
                    <Link to="/Registre" className="text-end">Are you New? Create account</Link>
                  </div>
                  <MDBBtn className="mb-8 w-50" size="lg"style={{ backgroundColor: '#e75e8e5b' }} onClick={handleLogin}>
                    <MDBIcon icon="sign-in-alt" className="me-2" />
                    Sign in
                  </MDBBtn>

                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

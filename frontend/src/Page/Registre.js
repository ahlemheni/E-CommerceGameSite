import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';

function Register() {
  const Username = useRef();
  const email = useRef();
  const pic = useRef();
  const [imagePreview, setImagePreview] = useState('');
  const phone = useRef();
  const password = useRef();
  const Cpassword = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  const handleImagePreview = () => {
    const reader = new FileReader();
    const file = pic.current.files[0];

    // Check if file extension is valid (jpg or png)
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      setErrorMessage('Invalid file format. Only JPG and PNG images are allowed.');
      return;
    }

    reader.onloadend = () => {
      setImagePreview(reader.result);
      setErrorMessage(''); 
    };
    reader.readAsDataURL(file);
  };
  const Register = () => {
    const emailValue = email.current.value;
    const phoneValue = phone.current.value;
    const passwordValue = password.current.value;
    const confirmPasswordValue = Cpassword.current.value;
    if (!Username.current.value || 
      !emailValue||
      !pic.current.value||
      !phoneValue||
      !passwordValue||
      !confirmPasswordValue
      ) {
      setErrorMessage('All fields are required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      setErrorMessage('Invalid email format.');
      return;
    }
  
    if (phoneValue.length < 8) {
      setErrorMessage('Phone number should be at least 8 digits long.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(passwordValue)) {
      setErrorMessage(
        'Password should be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one symbol, and one digit.'
      );
      return;
    }
  
    if (passwordValue !== confirmPasswordValue) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    const UserData = {
      username: Username.current.value,
      email: emailValue,
      phone_number:phoneValue,
      password:passwordValue,
      profileImage: imagePreview

    };
 
    axios
      .post('http://localhost:5000/save', UserData)
      .then(function (response) {
        console.log(response);
        alert('New User added');
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
        <MDBContainer fluid >
              <MDBRow>
              <h1 className="mb-4" style={{ color: '#a06177' }}><MDBIcon fas icon="user-plus" /> Create Account</h1>

                <MDBCol col="7" md="6">

                <div className="mb-4">
                    <label htmlFor="UsernameInput" className="form-label custom-label mb-2" style={{ color: '#e75e8d',fontSize:"20px" }}><MDBIcon icon="user-alt" className="me-2" /> Name :</label>
                    <MDBInput
                      id="UsernameInput"
                      type="text"
                      size="lg"
                      icon="envelope"
                      iconClass="text-primary"
                      placeholder="Enter your name"
                      ref={Username}
                      style={{ backgroundColor:"#e8d3d8" ,borderRadius:"25px"}}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="emailInput" className="form-label custom-label mb-2" style={{ color: '#e75e8d',fontSize:"20px" }}><MDBIcon icon="envelope" className="me-2" /> Email address :</label>
                    <MDBInput
                      id="emailInput"
                      type="email"
                      size="lg"
                      icon="envelope"
                      iconClass="text-primary"
                      placeholder="Enter your email"
                      ref={email}
                      style={{ backgroundColor:"#e8d3d8" ,borderRadius:"25px"}}

                    />
                  </div>
                  <div className="mb-4">
                  <label htmlFor="emailInput" className="form-label custom-label mb-2" style={{ color: '#e75e8d',fontSize:"20px" }}><MDBIcon icon="camera" className="me-2" /> Profile image :</label>
                        <input
                          type="file"
                          className="form-control"
                          style={{ backgroundColor:"#e8d3d8" ,borderRadius:"25px"}}
                          ref={pic}
                          onChange={handleImagePreview}

                        />
                        {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', maxWidth: '200px',borderRadius:"50%" }} />}

                      </div>
                  <div className="mb-4">
                    <label htmlFor="PhoneInput" className="form-label custom-label mb-2" style={{ color: '#e75e8d',fontSize:"20px" }}><MDBIcon icon="phone-alt" className="me-2" /> Phone Number :</label>
                    <MDBInput
                      id="PhoneInput"
                      type="number"
                      size="lg"
                      icon="envelope"
                      iconClass="text-primary"
                      placeholder="Enter your Phone number"
                      ref={phone}
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
                  <div className="mb-4">
                    <label htmlFor="passwordInput" className="form-label custom-label mb-2" style={{ color: '#e75e8d',fontSize:"20px" }}><MDBIcon icon="lock" className="me-2"/>Confirm Password :</label>
                    <MDBInput
                      id="passwordInput"
                      type="password"
                      size="lg"
                      icon="lock"
                      iconClass="text-primary"
                      placeholder="Enter your password"
                      ref={Cpassword}
                      style={{ backgroundColor:"#e8d3d8" ,borderRadius:"25px"}}

                    />
                  </div>
                  {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                
                  <MDBBtn className="mb-8 w-50" size="lg"style={{ backgroundColor: '#e75e8e5b' }} onClick={Register}>
                    <MDBIcon icon="sign-in-alt" className="me-2" />
                    Submit
                  </MDBBtn>

                </MDBCol>
                <MDBCol col="5" md="6" style={{ marginTop:"100px" }}>
                  <img
                   src="https://cdn-icons-png.flaticon.com/512/3456/3456400.png "
                    className="img-fluid"
                   
                  />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
    </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
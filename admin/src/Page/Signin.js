import React from 'react'
import { Link } from 'react-router-dom';
const Signin = () => {
  return (
    <div className="container-fluid position-relative d-flex p-0">
     <div class="content">
    <div className="container-fluid position-relative d-flex p-0">
      <div className="container-fluid">
        <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "0vh" }}>
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4" style={{width:"auto"}}>
            <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <a href="index.html" className="">
                  <h5 className="text-primary">
                    <i className="fa fa-user-edit me-2"></i>Gamer's zone
                  </h5>
                </a>
                <h5>Sign In</h5>
              </div>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <Link  to="">Forgot Password</Link>
              </div>
              <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign In</button>
              <p className="text-center mb-0">Don't have an Account? <Link to="">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
     
    </div>
    </div>
    </div>
   
  )
}

export default Signin
import React from 'react'
import { Link } from 'react-router-dom';
const Blank = () => {
  return (
    <div className="container-fluid position-relative d-flex p-0">
     <div class="content">
       <div className="container-fluid pt-4 px-4">
        <div className="row vh-100 bg-secondary rounded align-items-center justify-content-center mx-0">
          <div className="col-md-6 text-center">
            <h3>This is blank page</h3>
          </div>
        </div>
        </div>
        </div>
    <Link to="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></Link>
  </div>
  


  )
}

export default Blank

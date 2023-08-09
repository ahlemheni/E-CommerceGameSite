
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {  MDBIcon } from 'mdb-react-ui-kit';

const Form = () => {
  

  return (
    <div class="container-fluid position-relative d-flex p-0">
    <div class="content">
       <div className="container-fluid ">
       <div className="row justify-content-center align-items-center">

          <div className="col-sm-6 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h4 className="mb-4" style={{textAlign:"center"}}> <MDBIcon fas icon="plus" /> ADD Product</h4>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1"><MDBIcon fas icon="terminal" /></span>
                <input type="text" className="form-control" placeholder="Name Of product" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group mb-5">
                <span className="input-group-text">$</span>
                <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"  placeholder="Price/U" />
                <span className="input-group-text">.00</span>
                <span className="input-group-text"><MDBIcon fas icon="list-ol" /></span>
                <input type="number" className="form-control" placeholder="Quantity" aria-label="Server" />

              </div>
              <div className="input-group mb-5" > 
              <span className="input-group-text">Genre</span>

<select name="pets" id="pet-select" className="form-control" style={{backgroundColor:"black"}}>
  <option className="input-group-text" value="">--Please choose an option--</option>
  <option value="dog">Dog</option>
  <option value="cat">Cat</option>
  <option value="hamster">Hamster</option>
  <option value="parrot">Parrot</option>
  <option value="spider">Spider</option>
  <option value="goldfish">Goldfish</option>
</select>
<span className="input-group-text">Categorie</span>

<select name="pets" id="pet-select" className="form-control" style={{backgroundColor:"black"}}>
  <option className="input-group-text" value="">--Please choose an option--</option>
  <option value="dog">Dog</option>
  <option value="cat">Cat</option>
  <option value="hamster">Hamster</option>
  <option value="parrot">Parrot</option>
  <option value="spider">Spider</option>
  <option value="goldfish">Goldfish</option>
</select>
</div>

              <div className="input-group mb-5">
              <span className="input-group-text" id="basic-addon2"><MDBIcon far icon="images" /></span>

              <input className="input-group-text" type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" style={{backgroundColor:"black"}} />
              </div>
           
              <div className="input-group">
                <span className="input-group-text">Description</span>
                <textarea className="form-control" aria-label="With textarea" defaultValue={""} />
              </div>
            </div>
          </div>
        
        </div>
        </div>
        </div>
      
  </div>

  )
}

export default Form



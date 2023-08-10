import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from "mdb-react-ui-kit";

    const Table = () => {
        const [errorMessage, setErrorMessage] = useState('');
        const [products, setProducts] = useState([]);
        const [showUpdateModal, setShowUpdateModal] = useState(false);
        const [selectedProduct, setSelectedProduct] = useState(null);
        const [imagePreview, setImagePreview] = useState('');
        const [price, setprice] = useState('');
        const [quantity, setquantity] = useState('');
        const [pic, setPic] = useState(null);
        const [productid,SetproductId]=useState('')
        const handleImagePreview = (pic) => {
   
            const reader = new FileReader();
            const file = pic.target.files[0];
        
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
        const handleRetrieveProduct = () => {
            axios.get("http://localhost:5000/products/getgenre")
                .then(response => {
                    setProducts(response.data); // Update the state with fetched products
                })
                .catch(error => {
                    if (error.response) {
                        setErrorMessage(error.response.data);
                    } else {
                        setErrorMessage("An Error has Occurred. Please try again later.");
                    }
                });
        };
    
        useEffect(() => {
            handleRetrieveProduct(); // Fetch products when the component mounts
        }, []);
        const handleDeleteProduct = (productId, productName) => {
            const deleteData = {
                _id: productId,
                name: productName
            };
            
            axios.post('http://localhost:5000/product/delete', deleteData)
                .then(response => {
                    // Refresh the product list after successful deletion
                    handleRetrieveProduct();
                })
                .catch(error => {
                    if (error.response) {
                        setErrorMessage(error.response.data);
                    } else {
                        setErrorMessage("An Error has Occurred. Please try again later.");
                    }
                });
        };
        const handleOpenUpdateModal = (productId) => {
            const productToUpdate = products.find(product => product._id === productId);
            setSelectedProduct(productToUpdate);
            SetproductId(productToUpdate._id);
            setprice(productToUpdate.price); // Set the price state with the selected product's price
            setquantity(productToUpdate.qty); // Set the quantity state with the selected product's quantity
            setShowUpdateModal(true);
          };
    const handleUpdateProduct =()=>{
        const UpdateData= {
            _id:productid,
            qty:quantity,
            price:price,
            image:imagePreview
        }
        axios.post('http://localhost:5000/product/update',UpdateData)
        .then(response=>{
            setShowUpdateModal(false)
            handleRetrieveProduct()

        })
        .catch((error)=>{
            if (error.response) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage("An Error has Occurred. Please try again later.");
            }
        })

    }
  return (
    <div class="container-fluid position-relative d-flex p-0">
    <div class="content">
   
     <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                  
                    <div className="col-12">
                        <div className="bg-secondary rounded h-100 p-4">
                            <h6 className="mb-4">Responsive Table</h6>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Label</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Game Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
    {products.map((product, index) => (
        <tr key={product._id}>
            <th scope="row">{index + 1}</th>
            <td>{product.name}</td>
            <td>{product.qty}</td>
            <td>{product.category}</td>
            <td>{product.game_title}</td>
            <td>{product.genre.name}</td>
            <td>{product.description}</td>
            <td>{product.price}$</td>
            <td>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteProduct(product._id,product.name)}
                >
                    Delete
                </button>
                <button
                className="btn btn-primary btn-sm mx-2"
                onClick={() => handleOpenUpdateModal(product._id)}
                >
                 Update
                </button>
            </td>
        </tr>
    ))}
</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MDBModal show={showUpdateModal} tabIndex="-1">
  <MDBModalDialog>
    <MDBModalContent>
      <MDBModalHeader>
     
        <MDBBtn
          className="btn-close"
          color="none"
          onClick={() => setShowUpdateModal(false)}
        ></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>
      
              <h4 className="mb-4" style={{textAlign:"center", color:'black'}}> <MDBIcon fas icon="plus" /> Update Product</h4>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1"><MDBIcon fas icon="terminal" /></span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="ProductId"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={productid} // Use productid state here
                    
                    disabled
                />
              </div>
             
              <div className="input-group mb-5">
                <span className="input-group-text">$</span>
                <input type="text" 
                className="form-control" 
                aria-label="Amount (to the nearest dollar)" 
                 placeholder="Price/U" 
                 value={price}
                  onChange={(e) => setprice(e.target.value)}
                 />
              
                <span className="input-group-text">.00</span>
                <span className="input-group-text"><MDBIcon fas icon="list-ol" /></span>
                <input type="number"
                 className="form-control" 
                 placeholder="Quantity"
                  aria-label="Server"
                  value={quantity}
                  onChange={(e) => setquantity(e.target.value)}
                   />

              </div>
             

              <div className="input-group mb-5">
              <span className="input-group-text" id="basic-addon2"><MDBIcon far icon="images" /></span>

              <input className="input-group-text"
               type="file"
                id="avatar"
                 name="avatar"
                  accept="image/png, image/jpeg" 
                  style={{backgroundColor:"black"}}
                  onChange={(e) => {
                    setPic(e.target.files[0]);
                    handleImagePreview(e);
                  }}
                   />
                    {imagePreview && (
                      <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', maxWidth: '200px', borderRadius: '50%' }} />
                    )}
              </div>
           
             
              <br/>
              {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
             

      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={() => setShowUpdateModal(false)}>
          Cancel
        </MDBBtn>
        <MDBBtn color="primary" onClick={()=>handleUpdateProduct()}>
          Update
        </MDBBtn>
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>
            </div>
        <Link to="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></Link>
    </div>


 
  )
}

export default Table;

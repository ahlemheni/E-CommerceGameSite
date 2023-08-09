import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

    const Table = () => {
        const [errorMessage, setErrorMessage] = useState('');
        const [products, setProducts] = useState([]);
    
        const handleRetrieveProduct = () => {
            axios.get("http://localhost:5000/products/all")
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
    const handleUpdateProduct =()=>{

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
                    onClick={() => handleUpdateProduct(product._id)}
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
            </div>
        <Link to="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></Link>
    </div>


 
  )
}

export default Table

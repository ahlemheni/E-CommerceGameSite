import { useEffect, useState } from "react";
import GameCard from "../Components/GameCard/gameCard";
import { MDBContainer, MDBCol, MDBRow, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';

function Shop() {
  
  const [games, setGames] = useState([]);
  const [notFound, setNotFound] = useState(false); // Change the initial state to false
  const [selectedOption, setSelectedOption] = useState("0");

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products/all');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

 

  const filterByName = () => {
    let input = document.getElementById("gameID").value.toUpperCase();
    if (input === '') {
      fetchGames();
      setNotFound(false);
    } else {
      const newList = games.filter((item) => item.name.toUpperCase().indexOf(input) > -1);
      setGames(newList);
      setNotFound(newList.length === 0); 
    }
  };
    return (

        <div>
           <div className="container">
          <div className="row">
            <div className="col-lg-12 ">
              <div className="page-content">
              
              <div className="col-lg-4">
                 <div className="top-downloaded">
                   <div className="heading-section">
                       <h4><em></em> Categories</h4>
                    </div>
                       <ul>
                         <li>
                         <a href="Clothes.js"> <h6>Clothes</h6></a>
                          </li>

                          <li>
                          <a href="Cosmetics"> <h6>Cosmetics</h6></a>
                           
                          </li>
                          <li>
                          <a href="Electronics"> <h6>Electronics</h6></a>
                            
                          </li>
                          <li>
                          
              <div className="filters text-light my-4 d-flex justify-content-between">
                <div className="d-flex mt-4">
                  <span className="mx-2">
                   Price </span>
                  <div className="d-flex justify-content-between">
                    <span className="px-2">10$</span>
                      <input type="range" className="form-range" id="customRange1" />
                       <span className="px-2">100$</span>
              
                </div>
                </div>
                </div>
                          </li>
                        </ul>
                  </div>
              </div>
             </div>
               
            
             
           
                <div className="col-lg-8">
                  <div className="featured-games header-text">
                  
                      <div className="item">
                        <div className="thumb">
            
              
     
     
              <div className="mt-3">
                <span className="mx-3">Category</span>
                <div className="btn-group dropend">
                   <select onChange={handleOptionChange} value={selectedOption} className=" bg-light  " id="categoryGames">
                     <option value={"0"}>Select Category</option>
                     <option value={"online"}>Online Games</option>
                     <option value={"multiplayer"}>Multiplayer Games</option>
                     <option value={"arcade"}>Arcade Games</option>
                    </select>
                 </div>
              </div>
                   <div className="row mt-4">
                     <div className="col-6 text-end">
                      <span className="mx-2 ">Game ID/Name :</span>
                    </div>
                    </div>
     <div className="col-6 ">
<input onChange={filterByName} type="text" id="gameID" className="form-control form-control-sm " />
</div>
     </div>
  </div>
         {notFound === 1 ?    <div className="row trending-box">
             {games && games.map(gm => (
              <GameCard game={gm} />
             ))}
             
              </div> : 
              <div className="text-center">
              <img height={"90px"} id="iconeNotFound"  src="https://cdn-icons-png.flaticon.com/512/1178/1178479.png"/>
              <h1 className="text-light">Product not found</h1>
              </div>
             
              }
              </div>
                </div>
              
            
          
            </div>
            </div> </div>
              <div className="most-popular">
            <div className="row">
              <div className="col-lg-12">
                <div className="heading-section">
                  <h4><em>Most Reviwed</em> Product</h4>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <div className="item">
                      <img src="assets/images/trending-04.jpg" alt=""/>
                     <h4>Fortnite<br/><span>Sandbox</span></h4>
                      <ul>
                        <li><i className="fa fa-star"></i> 4.8</li>
                        
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="item">
                      <img src="assets/images/trending-03.jpg" alt=""/>
                      <h4>PubG<br/><span>Battle S</span></h4>
                      <ul>
                        <li><i className="fa fa-star"></i> 4.8</li>
                        
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="item">
                      <img src="assets/images/trending-02.jpg" alt=""/>
                      <h4>Dota2<br/><span>Steam-X</span></h4>
                      <ul>
                        <li><i className="fa fa-star"></i> 4.8</li>
                       
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="item">
                      <img src="assets/images/trending-01.jpg" alt=""/>
                      <h4>CS-GO<br/><span>Legendary</span></h4>
                      <ul>
                        <li><i className="fa fa-star"></i> 4.8</li>
                        
                      </ul>
                    </div>

      <div className="row">
      <div className="col-lg-8">
        <div className="featured-games header-text">
          
          <div className="owl-features owl-carousel">
            <div className="item">
              <div className="thumb">
                <img src="assets/images/featured-01.jpg" alt=""/>
                <div className="hover-effect">
                  <h6>2.4K Streaming</h6>
                </div>
              </div>
              <h4>CS-GO<br/><span>249K Downloads</span></h4>
              <ul>
                <li><i className="fa fa-star"></i> 4.8</li>
                <li><i className="fa fa-download"></i> 2.3M</li>
              </ul>
            </div>
            <div className="item">
              <div className="thumb">
                <img src="assets/images/featured-02.jpg" alt=""/>
                <div className="hover-effect">
                  <h6>2.4K Streaming</h6>
                </div>
              </div>
              <h4>Gamezer<br/><span>249K Downloads</span></h4>
              <ul>
                <li><i className="fa fa-star"></i> 4.8</li>
                <li><i className="fa fa-download"></i> 2.3M</li>
              </ul>
            </div>
            <div className="item">
              <div className="thumb">
                <img src="assets/images/featured-03.jpg" alt=""/>
                <div className="hover-effect">
                  <h6>2.4K Streaming</h6>
                </div>
              </div>
              <h4>Island Rusty<br/><span>249K Downloads</span></h4>
              <ul>
                <li><i className="fa fa-star"></i> 4.8</li>
                <li><i className="fa fa-download"></i> 2.3M</li>
              </ul>
            </div>
            <div className="item">
              <div className="thumb">
                <img src="assets/images/featured-01.jpg" alt=""/>
                <div className="hover-effect">
                  <h6>2.4K Streaming</h6>
                </div>
              </div>
              <h4>CS-GO<br/><span>249K Downloads</span></h4>
              <ul>
                <li><i className="fa fa-star"></i> 4.8</li>
                <li><i className="fa fa-download"></i> 2.3M</li>
              </ul>
            </div>
            <div className="item">
              <div className="thumb">
                <img src="assets/images/featured-02.jpg" alt=""/>
                <div className="hover-effect">
                  <h6>2.4K Streaming</h6>
                </div>
              </div>
              <h4>Gamezer<br/><span>249K Downloads</span></h4>
              <ul>
                <li><i className="fa fa-star"></i> 4.8</li>
                <li><i className="fa fa-download"></i> 2.3M</li>
              </ul>
            </div>
            <div className="item">
              <div className="thumb">
                <img src="assets/images/featured-03.jpg" alt=""/>
                <div className="hover-effect">
                  <h6>2.4K Streaming</h6>
                </div>
              </div>
              <h4>Island Rusty<br/><span>249K Downloads</span></h4>
              <ul>
                <li><i className="fa fa-star"></i> 4.8</li>
                <li><i className="fa fa-download"></i> 2.3M</li>
              </ul>
            </div>
=======
      <div className="container">
      <div className="row">
        <div className="page-content" >
      <MDBRow>

      <MDBCol md="3" >
          <div className="top-downloaded">
            <div className="heading-section">
              <h4><em></em> Categories</h4>
            </div>
            <ul>
            <li><a href="Clothes.js"><h6>All</h6></a></li>

              <li><a href="Clothes.js"><h6>Clothes</h6></a></li>
              <li><a href="Cosmetics"><h6>Cosmetics</h6></a></li>
              <li><a href="Electronics"><h6>Electronics</h6></a></li>
            </ul>

          </div>
        </MDBCol>
        <MDBCol md="9">
           
                  <div className="filters text-light my-4 d-flex justify-content-between"  > 
                  <div className="d-flex mt-4">
                      <span className="mx-2">Price :</span>
                      <div className="d-flex justify-content-between">
                        <span className="px-2">10$</span>
                        <input type="range" className="form-range" id="customRange1" />
                        <span className="px-2">100$</span>
                      </div>
                    </div>
             
                    <div className="row mt-4">
                      <div className="col-6 text-end">
                        <span className="mx-2">Game ID/Name :</span>
                      </div>
                      <div className="col-6">
                      <input onChange={filterByName} type="text" id="gameID" className="form-control form-control-sm" />
                      </div>
                    </div>
                  </div>
                  {games.length > 0 ? ( // Check if the games array is not empty
                <div className="row trending-box">
                  {games.map((gm) => (<GameCard game={gm} key={gm._id} />))}
                </div>
                  ) : (
                    <div className="text-center">
                      <img height={"90px"} id="iconeNotFound" src="https://cdn-icons-png.flaticon.com/512/1178/1178479.png" />
                      <h1 className="text-light">Product not found</h1>
                    </div>
                  )}
        </MDBCol>

      </MDBRow>
      </div>
      </div>
      </div>

         

   




             
    );
}
export default Shop;
import { useEffect, useState } from "react";
import GameCard from "../Components/GameCard/gameCard";
import { MDBContainer, MDBCol, MDBRow, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { NavLink } from "react-router-dom";

function Shop() {
  const [selectedOption, setSelectedOption] = useState("0");
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]); // Store all games to avoid refetching from the server
  const [Price, setPrice] = useState(0);
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products/all');
      setGames(response.data);
      setAllGames(response.data); // Save all games to use for filtering later
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };
  

  const filterByCategory = (selectedOption) => {
    setSelectedOption(selectedOption);
    let filteredArray = allGames;
    if (selectedOption !== "0") {
      filteredArray = allGames.filter((item) => item.category === selectedOption);
    }
    if (Price !== 0) {
      filteredArray = filteredArray.filter((item) => item.price <= Price);
    }
    setGames(filteredArray);
  };

  const filterByNameAndCategory = () => {
    let input = document.getElementById("gameID").value.toUpperCase();
    let selectedCategory = selectedOption;
    if (input === '' && selectedCategory === "0" && Price === 0) {
      setGames(allGames); 
    } else {
      let filteredArray = allGames;
      if (selectedCategory !== "0") {
        filteredArray = allGames.filter((item) => item.category === selectedCategory);
      }
      if (input !== '') {
        filteredArray = filteredArray.filter((item) => item.name.toUpperCase().indexOf(input) > -1);
      }
      if (Price !== 0) {
        filteredArray = filteredArray.filter((item) => item.price <= Price);
      }
      setGames(filteredArray);
    }
  };

  const filterByPrice = (selectedPrice) => {
    setPrice(selectedPrice);
    let filteredArray = allGames;
    if (selectedOption !== "0") {
      filteredArray = allGames.filter((item) => item.category === selectedOption);
    }
    if (selectedPrice !== 0) {
      filteredArray = filteredArray.filter((item) => item.price <= selectedPrice);
    }

    setGames(filteredArray);
  };
  
    return (

      <div className="container " >
      <div className="row">
        <div className="page-content" >
      <MDBRow>

      <MDBCol md="3"  >
          <div className="top-downloaded  ">
            <div className="heading-section">
              <h4><MDBIcon fas icon="database" /> Categories</h4>
            </div>
            
            <nav className="main-nav">
            <ul value={selectedOption} >
                  <li><NavLink  value={"0"} onClick={() => filterByCategory("0")}  ><h6 style={{ color: selectedOption === "0" ? '' : 'rgba(255, 255, 255, 0.205)' }}><MDBIcon fas icon="align-justify" /> All</h6></NavLink></li>
                  <li><NavLink  value={"clothes"} onClick={() => filterByCategory("clothes")}><h6 style={{ color: selectedOption === "clothes" ? '' : 'rgba(255, 255, 255, 0.205)' }}><MDBIcon fas icon="tshirt" /> Clothes</h6></NavLink></li>
                  <li><NavLink  value={"cosmetics"} onClick={() => filterByCategory("cosmetics")}><h6 style={{ color: selectedOption === "cosmetics" ? '' : 'rgba(255, 255, 255, 0.205)' }}><MDBIcon fas icon="user-astronaut" /> Cosmetics</h6></NavLink></li>
                  <li ><NavLink  value={"electronics"} onClick={() => filterByCategory("electronics")}><h6 style={{ color: selectedOption === "electronics" ? '' : 'rgba(255, 255, 255, 0.205)' }}><MDBIcon fas icon="headphones" /> Electronics</h6></NavLink></li>
                </ul>
                </nav>

          </div>
        </MDBCol>
        <MDBCol md="9">
           
                  <div className="filters text-light my-4 d-flex justify-content-between"  > 
                  <div className="d-flex mt-3">
                      <span className="mx-1"><MDBIcon fas icon="dollar-sign" /> Price :</span>
                      <div className="d-flex justify-content-between">
                      <span className="px-1">{Price}$</span>
                      
                      <input
                        type="range"
                        className="form-range"
                        min={0}
                        max={500}
                        value={Price}
                        onChange={(e) => filterByPrice(parseInt(e.target.value))}

                      />
                    <span className="px-1">500$</span>
                  </div>
                  {/* <input
                    type="text"
                    id="priceRange"
                    className=" form-control-sm"
                    value={`${Price}$`}
                    readOnly
                    style={{width:"80px"}}
                  /> */}
                </div>
           
              
                    <div className="d-flex mt-3">

                    <span className="mx-1"> <MDBIcon  className="mx-1"fas icon="search" /> Game Name :</span>
                        <div className="d-flex justify-content-between">

                      <input onChange={filterByNameAndCategory} type="text" id="gameID"   placeholder="Search games..." className="form-control form-control-sm"  style={{ backgroundColor: '#e8d3d8', borderRadius: '25px' }} />
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
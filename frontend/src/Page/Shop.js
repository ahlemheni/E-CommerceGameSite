import { useEffect, useState } from "react";
import GameCard from "../Components/GameCard/gameCard";
import { MDBContainer, MDBCol, MDBRow, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';

function Shop() {
  
  const [games, setGames] = useState([]);
  const [notFound, setNotFound] = useState(false); // Change the initial state to false

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
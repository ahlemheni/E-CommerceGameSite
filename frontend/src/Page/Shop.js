import { useEffect, useState } from "react";
import GameCard from "../Components/GameCard/gameCard";

function Shop() {
  
  const GamesIntialState =  [
    {id :"COD MMII" , name : "Call of Duty MW2", category : "online" , tags : ["MMII","COD"] , price : 50},
    {id :"Assasin" , name : "Assasin Creed Revolution", category : "arcade" , tags : ["ASC","Action"] , price : 100 },
    {id :"FIFA" , name : "FIFA EA 24", category : "multiplayer" , tags : ["Football","Joystick"] , price : 25},
    {id :"PES" , name : "PES 2024", category : "multiplayer" , tags : ["Football","Joystick"] , price : 10 },
    {id :"NFO" , name : "Need for Speed", category : "arcade" , tags : ["Speed","Cars"] , price : 90 },
    {id :"NBA" , name : "NBA 2k24", category : "multiplayer" , tags : ["Sport","Agressive"] , price : 45 },
  ];
  const [games, setGames] = useState(
    GamesIntialState
  )
  const [notFound, setNotFound] = useState(1)
  const [selectedOption, setSelectedOption] = useState("0");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Mettre à jour l'option sélectionnée
  };

  useEffect(() => {
    setGames(GamesIntialState)
    filterByCategory(selectedOption); // Appliquer le filtre lorsque l'option sélectionnée change ou lorsque le composant est monté
  }, [selectedOption]);

 

    const  filterByCategory = (selectedOption) => {
      console.log(selectedOption);
     
      if (selectedOption === "0") {
        setGames(GamesIntialState); // Restaurez l'état initial de votre tableau ici
      } else {
        setGames(GamesIntialState);
        const filteredArray = GamesIntialState.filter((item) => item.category === selectedOption);
        setGames(filteredArray);
      }
      

    };

    const  filterByName = () => {
   
      let input = document.getElementById("gameID").value.toUpperCase();
      const newList = games.filter((item) => {
        return item.name.toUpperCase().indexOf(input) > -1;
      })
      if(newList.length === 0) setNotFound(0);
    else{
      setGames(newList);
      setNotFound(1)
    }
      if(input.length ===0){
        setGames(GamesIntialState)
      }
      }
    return (
        <div>
           <div className="container">
          <div class="row">
            <div class="col-lg-12 ">
              <div class="page-content">
              
              <div class="col-lg-4">
                 <div class="top-downloaded">
                   <div class="heading-section">
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
                        </ul>
                  </div>
              </div>
             </div>
               
            
             
               <div class="row">
                <div class="col-lg-12">
                  <div class="featured-games header-text">
                  
                      <div class="item">
                        <div class="thumb">
             <div class="page-content pt-1">
              <div className="filters text-light my-4 d-flex justify-content-between">
                <div className="d-flex mt-4">
                  <span className="mx-2">Price :</span>
                  <div className="d-flex justify-content-between">
                    <span className="px-2">10$</span>
                      <input type="range" class="form-range" id="customRange1" />
                       <span className="px-2">100$</span>
                  </div>
                </div>
     
     
              <div className="mt-3">
                <span className="mx-3">Category</span>
                <div class="btn-group dropend">
                   <select onChange={handleOptionChange} value={selectedOption} class=" bg-light  " id="categoryGames">
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
         {notFound === 1 ?    <div class="row trending-box">
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
             
            
            </div>
            </div>
            </div> </div></div>
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

      <div class="row">
      <div class="col-lg-8">
        <div class="featured-games header-text">
          
          <div class="owl-features owl-carousel">
            <div class="item">
              <div class="thumb">
                <img src="assets/images/featured-01.jpg" alt=""/>
                <div class="hover-effect">
                  <h6>2.4K Streaming</h6>
                </div>
              </div>
              <h4>CS-GO<br/><span>249K Downloads</span></h4>
              <ul>
                <li><i class="fa fa-star"></i> 4.8</li>
                <li><i class="fa fa-download"></i> 2.3M</li>
              </ul>
            </div>
            <div class="item">
              <div class="thumb">
                <img src="assets/images/featured-02.jpg" alt=""/>
                <div class="hover-effect">
                  <h6>2.4K Streaming</h6>
                </div>
              </div>
              <h4>Gamezer<br/><span>249K Downloads</span></h4>
              <ul>
                <li><i class="fa fa-star"></i> 4.8</li>
                <li><i class="fa fa-download"></i> 2.3M</li>
              </ul>
            </div>
            <div class="item">
              <div class="thumb">
                <img src="assets/images/featured-03.jpg" alt=""/>
                <div class="hover-effect">
                  <h6>2.4K Streaming</h6>
                </div>
              </div>
              <h4>Island Rusty<br/><span>249K Downloads</span></h4>
              <ul>
                <li><i class="fa fa-star"></i> 4.8</li>
                <li><i class="fa fa-download"></i> 2.3M</li>
              </ul>
            </div>
            <div class="item">
              <div class="thumb">
                <img src="assets/images/featured-01.jpg" alt=""/>
                <div class="hover-effect">
                  <h6>2.4K Streaming</h6>
                </div>
              </div>
              <h4>CS-GO<br/><span>249K Downloads</span></h4>
              <ul>
                <li><i class="fa fa-star"></i> 4.8</li>
                <li><i class="fa fa-download"></i> 2.3M</li>
              </ul>
            </div>
            <div class="item">
              <div class="thumb">
                <img src="assets/images/featured-02.jpg" alt=""/>
                <div class="hover-effect">
                  <h6>2.4K Streaming</h6>
                </div>
              </div>
              <h4>Gamezer<br/><span>249K Downloads</span></h4>
              <ul>
                <li><i class="fa fa-star"></i> 4.8</li>
                <li><i class="fa fa-download"></i> 2.3M</li>
              </ul>
            </div>
            <div class="item">
              <div class="thumb">
                <img src="assets/images/featured-03.jpg" alt=""/>
                <div class="hover-effect">
                  <h6>2.4K Streaming</h6>
                </div>
              </div>
              <h4>Island Rusty<br/><span>249K Downloads</span></h4>
              <ul>
                <li><i class="fa fa-star"></i> 4.8</li>
                <li><i class="fa fa-download"></i> 2.3M</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      </div>
      </div></div>
      </div></div>
      </div>
      </div>

   




             
    );
}
export default Shop;
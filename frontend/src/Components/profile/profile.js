import Spinner from "../spinner/spinner";
import React, { useEffect, useState } from 'react';
import Clip from "../Clip/clip";
import axios from 'axios';
import {MDBIcon} from 'mdb-react-ui-kit';


import { useParams } from 'react-router-dom';


export default function Profile() {
  const { id } = useParams();

  const [user, setUser] = useState({});


  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/'+id);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [id]);


  return (
<div>
    {false ? 
       <Spinner></Spinner>
    : 
<div className="container">
  <div className="row">
    <div className="col-lg-12">
      <div className="page-content">
        {/* ***** Banner Start ***** */}
        <div className="row">
          <div className="col-lg-12">
            <div className="main-profile ">
              <div className="row">
                <div className="col-lg-4">
                  <img src={user.profileImage} alt style={{borderRadius: 500}} />
                </div>
                <div className="col-lg-4 align-self-center">
                  <div className="main-info header-text">
                    <span>Welcome</span>
                    <h4><MDBIcon icon="user-alt" className="me-2" />Name : {user.username}</h4>
                    <p>You Haven't Gone Live yet. Go Live By Touching The Button Below.</p>
                    <div className="main-border-button">
                      <a href="#">Start Live Stream</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 align-self-center">
                  <ul>
                  <li><MDBIcon icon="envelope" className="me-2" /> E-mail : {user.email} </li>
                    <li> <MDBIcon icon="phone-alt" className="me-2" />  Phone : {user.phone_number} </li>
                  </ul>
            
                </div>
              </div>
              <div className="container">
              
               
                  
                    <div class=" text-center">
                        <div className="heading-section">
                          <h4><em>Your Most Popular</em> Clips</h4>
                        </div>
                      </div>
                {/* <div className="d-flex flex-wrap justify-content-between">  
                 {
                    user && user.products.length > 8 ?
                    user.products.slice(0,j).map((produit)=>(
                        <Clip product={produit} />
                    ))
                    : 
                       user && user.products.map((produit)=>(
                        <Clip product={produit} />
                    ))
                     }
                    </div>
                  
                    
                     
                     
                      
                   {
                    user && user.products.length > 8      ? 
                    <div className="col-lg-12">
                    <div className="main-button">
                      <a ><button className="btn btn-link text-light " onClick={LoadMore}>Load More Clips</button></a>
                    </div>
                 
                </div>
                    :  <></>
                   } */}
                 
             
              </div>
              {/* <div>
                {
                    user && user.products.map((pd)=>
                    (<div className="bg-light text-dark">
                        {pd.title}
                    </div>)
                    )
                }
              </div> */}
            </div>
          </div>
        </div>
        {/* ***** Banner End ***** */}
        {/* ***** Gaming Library Start ***** */}
        <div className="gaming-library profile-library">
          <div className="col-lg-12">
            <div className="heading-section">
              <h4><em>Your Gaming</em> Library</h4>
            </div>
            <div className="item">
              <ul>
                <li><img src="assets/images/game-01.jpg" alt className="templatemo-item" /></li>
                <li><h4>Dota 2</h4><span>Sandbox</span></li>
                <li><h4>Date Added</h4><span>24/08/2036</span></li>
                <li><h4>Hours Played</h4><span>634 H 22 Mins</span></li>
                <li><h4>Currently</h4><span>Downloaded</span></li>
                <li><div className="main-border-button border-no-active"><a href="#">Donwloaded</a></div></li>
              </ul>
            </div>
            <div className="item">
              <ul>
                <li><img src="assets/images/game-02.jpg" alt className="templatemo-item" /></li>
                <li><h4>Fortnite</h4><span>Sandbox</span></li>
                <li><h4>Date Added</h4><span>22/06/2036</span></li>
                <li><h4>Hours Played</h4><span>745 H 22 Mins</span></li>
                <li><h4>Currently</h4><span>Downloaded</span></li>
                <li><div className="main-border-button border-no-active"><a href="#">Donwloaded</a></div></li>
              </ul>
            </div>
            <div className="item last-item">
              <ul>
                <li><img src="assets/images/game-03.jpg" alt className="templatemo-item" /></li>
                <li><h4>CS-GO</h4><span>Sandbox</span></li>
                <li><h4>Date Added</h4><span>21/04/2022</span></li>
                <li><h4>Hours Played</h4><span>632 H 46 Mins</span></li>
                <li><h4>Currently</h4><span>Downloaded</span></li>
                <li><div className="main-border-button border-no-active"><a href="#">Donwloaded</a></div></li>
              </ul>
            </div>
          </div>
        </div>
        {/* ***** Gaming Library End ***** */}
      </div>
    </div>
  </div>
</div>
}
</div>

    )
}


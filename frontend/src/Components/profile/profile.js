import Spinner from "../spinner/spinner";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [cookies] = useCookies(['session']);
  const navigate = useNavigate();

  const id = cookies.id;
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/' + id);
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    if (id ) {
      getUserData();
    } else {
      navigate('/Login');
    }
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-content">
                {/* ***** Banner Start ***** */}
                <div className="row">
                  <div className="col-lg-12">
                    <div className="main-profile ">
                      <div className="row">
                        <div className="col-lg-4 d-flex justify-content-center align-items-center">
                          <img
                            src={user.profileImage}
                            alt=""
                            style={{
                              width: '200px',
                              height: '200px',
                              borderRadius: '50%',
                            }}
                          />
                        </div>
                        <div className="col-lg-4 align-self-center">
                          <div className="main-info header-text">
                            <span>Welcome</span>
                            <h4   style={{
                              color:"white"
                            }}>
                              <MDBIcon
                                icon="user-alt"
                                className="me-2"
                              />
                              Name : {user.username}
                            </h4>
                            <p>
                              You Haven't Gone Live yet. Go Live By Touching
                              The Button Below.
                            </p>
                            <div className="main-border-button">
                              <a href="#">Start Live Stream</a>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 align-self-center">
                          <ul>
                            <li>
                              <MDBIcon
                                icon="envelope"
                                className="me-2"
                              />{' '}
                              E-mail : {user.email}{' '}
                            </li>
                            <li>
                              {' '}
                              <MDBIcon
                                icon="phone-alt"
                                className="me-2"
                              />{' '}
                              Phone : {user.phone_number}{' '}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="container">
                        <div class="text-center">
                          <div className="heading-section">
                            <h4>
                              <em>Your Most Popular</em> Clips
                            </h4>
                          </div>
                        </div>
                        {/* Rest of the code */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* ***** Banner End ***** */}
                {/* Rest of the code */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

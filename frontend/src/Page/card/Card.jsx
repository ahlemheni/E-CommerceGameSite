import React from 'react'
import Header from '../../Components/Header'
import { Row,Col, Container}from "reactstrap"
import './card.css';
import { AiTwotoneDelete } from "react-icons/ai";
import Footer from '../../Components/Footer';


const Card = () => {
    return (
      <>
        <Header />
       
        <section>
        <div className="mainbanner">
          <img src='./assets/images/Game Banner.jpg' alt='' />
          
        </div>
          <Container>
            <Row>
              <Col lg="9">
            <div className="table-container">
              <table className="table bordered">
                  <thead>
                    <tr>
                    <th className="white-text"> Product Image</th>
                    <th className="white-text">Title</th>
                    <th className="white-text">Price</th>
                    <th className="white-text">Quantite</th>
                    <th className="white-text">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><img src='./assets/images/clip-01.jpg' alt=''></img></td>
                      <td className="white-text">Aventure</td>
                      <td className="white-text">200$</td>
                      <td className="white-text">2</td>
                      <td className="white-text"><AiTwotoneDelete/> </td>
                    </tr>
                    <tr>
                      <td><img src='./assets/images/clip-02.jpg' alt=''></img></td>
                      <td className="white-text">Action</td>
                      <td className="white-text">50$ </td>
                      <td className="white-text">1</td>
                      <td className="white-text"><AiTwotoneDelete/></td>
                    </tr>
                    <tr>
                      <td><img src='./assets/images/clip-03.jpg' alt=''></img></td>
                      <td className="white-text">comédie</td>
                      <td className="white-text">100$</td>
                      <td className="white-text">2</td>
                      <td className="white-text"><AiTwotoneDelete/></td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer/>
      </>
    );
  };

export default Card
import { useCookies } from 'react-cookie';
import {  MDBIcon } from 'mdb-react-ui-kit';

import { NavLink } from 'react-router-dom';

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(['session','username','id']);
  const sessionCookie = cookies.session;
  const username = cookies.username;

  const handleLogout = () => {
    removeCookie('session');
    removeCookie('username');
    removeCookie('id');

  };

  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">

          <div className="col-12">
            <nav className="main-nav">
              <NavLink to="/"  className="logo">
                <img src="assets/images/logo.png" alt="" style={{marginTop:"-10px"}}/>
              </NavLink>
              <div className="search-input">
                <form id="search" action="#">
                  <input type="text" placeholder="Type Something" id='searchText' name="searchKeyword" onKeyPress="handle" />
                  <i className="fa fa-search"></i>
                </form>
              </div>
              <ul className="nav">
                <li><NavLink to="/"><MDBIcon fas icon="home" /> Home</NavLink></li>
                <li><NavLink to="/shop" ><MDBIcon fas icon="shopping-cart" /> Shop</NavLink></li>
                
                {sessionCookie ? (
                  <>
                    <li><NavLink to="/card" ><MDBIcon fas icon="shopping-basket" /></NavLink></li>
                    <li><NavLink to="/Login" onClick={handleLogout}><MDBIcon fas icon="sign-out-alt" /> Logout</NavLink></li>
                    <li><NavLink to={`/profile/${username}`}>Profile <img src="../assets/images/profile-header.jpg" alt="" /></NavLink></li>
                  </>
                ) : (
                  <>
                    <li><NavLink to="/Registre"><MDBIcon fas icon="user-plus" /> Register</NavLink></li>
                    <li><NavLink to="/Login"><MDBIcon fas icon="sign-in-alt" /> Login</NavLink></li>
                    <li></li>
                  </>
                )}
              </ul>
              <a className='menu-trigger'>
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

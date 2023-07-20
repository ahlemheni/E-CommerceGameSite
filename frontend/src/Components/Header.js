import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {  MDBIcon } from 'mdb-react-ui-kit';


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
              <Link to="/"  className="logo">
                <img src="assets/images/logo.png" alt="" style={{marginTop:"-10px"}}/>
              </Link>
              <div className="search-input">
                <form id="search" action="#">
                  <input type="text" placeholder="Type Something" id='searchText' name="searchKeyword" onKeyPress="handle" />
                  <i className="fa fa-search"></i>
                </form>
              </div>
              <ul className="nav">
                <li><Link to="/" className="active"><MDBIcon fas icon="home" /> Home</Link></li>
                <li><Link to="/shop"><MDBIcon fas icon="shopping-cart" /> Shop</Link></li>
                
                {sessionCookie ? (
                  <>
                    <li><Link to="/card"><MDBIcon fas icon="shopping-basket" /></Link></li>
                    <li><Link to="/Login" onClick={handleLogout}><MDBIcon fas icon="sign-out-alt" /> Logout</Link></li>
                    <li><Link to={`/profile/${username}`}>Profile <img src="../assets/images/profile-header.jpg" alt="" /></Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/Registre"><MDBIcon fas icon="user-plus" /> Register</Link></li>
                    <li><Link to="/Login"><MDBIcon fas icon="sign-in-alt" /> Login</Link></li>
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

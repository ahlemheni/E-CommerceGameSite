import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';


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
                <li><Link to="/" className="active">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                
                {sessionCookie ? (
                  <>
                    <li><Link to="/card"><BsCart2 /></Link></li>
                    <li><Link to="/Login" onClick={handleLogout}>Logout</Link></li>
                    <li><Link to={`/profile/${username}`}>Profile <img src="../assets/images/profile-header.jpg" alt="" /></Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/Registre">Register</Link></li>
                    <li><Link to="/Login">Login</Link></li>
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

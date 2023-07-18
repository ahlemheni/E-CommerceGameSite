import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';


function Header(){
    return(
    
    <>

  <header className="header-area header-sticky">
    <div className="container">
        <div className="row">
            <div className="col-12">
                <nav className="main-nav p-0">
                <Link to="/" className="navbar-brand">
                        <img className='p-0 m-0' src="assets/images/logo.png" width="110" height="110" alt=""/>
                        </Link>
                    <div className="search-input mt-3 ms-5">
                      <form id="search" action="#">
                        <input type="text" placeholder="Type Something" id='searchText' name="searchKeyword" onkeyPress="handle" />
                        <i className="fa fa-search"></i>
                      </form>
                    </div>
                    <ul className="nav mt-2">
                        <li><Link to="/" className="active">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/Registre">Register</Link></li>
                        <li><Link to="/Login">Login</Link></li>
                        <li><Link to="/card"><BsCart2/></Link></li>
                        <li><Link to="/profile">Profile <img src="../assets/images/profile-header.jpg" alt=""/></Link></li>
                    </ul>   
                    <a className='menu-trigger'>
                        <span>Menu</span>
                    </a>
                </nav>
            </div>
        </div>
    </div>
  </header>

    
         </>);
    }
    export default Header
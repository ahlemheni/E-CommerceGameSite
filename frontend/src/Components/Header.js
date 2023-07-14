import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';


function Header(){
    return(
    
    <>

  <header className="header-area header-sticky">
    <div className="container">
        <div className="row">
            <div className="col-12">
                <nav className="main-nav">
                    <a href="index.html" className="logo">
                        <img src="assets/images/logo.png" alt=""/>
                    </a>
                    <div className="search-input">
                      <form id="search" action="#">
                        <input type="text" placeholder="Type Something" id='searchText' name="searchKeyword" onkeypress="handle" />
                        <i className="fa fa-search"></i>
                      </form>
                    </div>
                    <ul className="nav">
                        <li><Link to="/" className="active">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
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
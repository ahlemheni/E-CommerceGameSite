import { BsCart2 } from 'react-icons/bs';


function Header(){
    return(
    
    <>
  <div id="js-preloader" className="js-preloader">
    <div className="preloader-inner">
      <span className="dot"></span>
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
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
                        <li><a href="index.html" className="active">Home</a></li>
                        <li><a href="browse.html">Shop</a></li>
                        <li><a href="details.html">Register</a></li>
                        <li><a href="streams.html">Login</a></li>
                        <li><a href="streams.html"><BsCart2/></a></li>
                        <li><a href="profile.html">Profile <img src="../assets/images/profile-header.jpg" alt=""/></a></li>
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
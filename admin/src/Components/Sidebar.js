import React, { useRef, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
function Sidebar(){
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
    return(
      <div className="content">
      <div className="container-fluid position-relative d-flex p-0">
<div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-secondary navbar-dark">
      
        <Link to="/Home" className="navbar-brand mx-4 mb-3">
        <h3 className="text-primary" style={{lineHeight:0.6 ,color:'#d63384'}} ><img  className='logo' src="img/logo1.png"  style={{width: 60, height: 60,display:'block',marginLeft:'auto',marginRight:'auto',}} /><br/>Gamer's <span style={{color : 'white'}}>zone</span></h3>
        </Link>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img className="rounded-circle" src="img/user.jpg" alt style={{width: 40, height: 40}} />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
          </div>
          <div className="ms-3">
            <h6 className="mb-0">Jhon Doe</h6>
            <span>Admin</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
        <Link
        to=""
        className={`nav-item nav-link ${activeLink === '' ? 'active' : ''}`}
        onClick={() => handleLinkClick('')}
      ><i className="fa fa-tachometer-alt me-2" />Dashboard</Link>
           <Link  to="/Home/Table" className={`nav-item nav-link ${activeLink === '/Home/Table' ? 'active' : ''}`}  onClick={() => handleLinkClick('/Home/Table')}><i className="fa fa-table me-2" />Tables Of Product</Link>
           <Link to="/Home/Form" className={`nav-item nav-link ${activeLink === '/Home/Form' ? 'active' : ''}`}  onClick={() => handleLinkClick('/Home/Form')}><i className="fa fa-keyboard me-2" />ADD Product</Link>

          <Link to="/Home/Chart" className={`nav-item nav-link ${activeLink === '/Home/Chart' ? 'active' : ''}`}  onClick={() => handleLinkClick('/Home/Chart')}><i className="fa fa-chart-bar me-2" />income</Link>
     
        </div>
      
      </nav>
    </div>
    </div>
     </div>
    );
}
export default Sidebar

import { Link } from 'react-router-dom';
function Sidebar(){
    return(
      <div className="content">
      <div className="container-fluid position-relative d-flex p-0">
<div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-secondary navbar-dark">
      
        <Link to="" className="navbar-brand mx-4 mb-3">
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
          <Link to="" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2" />Dashboard</Link>
          <div className="nav-item dropdown">
            <Link  to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2" />Elements</Link>
            <div className="dropdown-menu bg-transparent border-0">
              <Link to="/Button" className="dropdown-item">Buttons</Link>
              <Link to="/Typography" className="dropdown-item">Typography</Link>
              <Link to="/Element" className="dropdown-item">Other Elements</Link>
            </div>
          </div>
          <Link to="/Widget" className="nav-item nav-link"><i className="fa fa-th me-2" />Widgets</Link>
          <Link to="/Form" className="nav-item nav-link"><i className="fa fa-keyboard me-2" />Forms</Link>
          <Link  to="/Table" className="nav-item nav-link"><i className="fa fa-table me-2" />Tables</Link>
          <Link to="/Chart" className="nav-item nav-link"><i className="fa fa-chart-bar me-2" />Charts</Link>
          <div className="nav-item dropdown">
            <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="far fa-file-alt me-2" />Pages</Link>
            <div className="dropdown-menu bg-transparent border-0">
              <Link to="/Signin" className="dropdown-item">Sign In</Link>
              <Link to="/Signup" className="dropdown-item">Sign Up</Link>
              <Link to="/Error404" className="dropdown-item">404 Error</Link>
              <Link to="/Blank" className="dropdown-item">Blank Page</Link>
            </div>
          </div>
        </div>
      
      </nav>
    </div>
    </div>
     </div>
    );
}
export default Sidebar
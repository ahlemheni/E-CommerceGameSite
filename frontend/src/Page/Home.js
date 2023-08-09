import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function Home() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['session','username','id','cartItemsCount','CardId']);
  let inactivityTimeout;

function resetInactivityTimeout() {
  if (cookies.session) {

  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    // Perform actions after inactivity timeout (e.g., delete cookies and redirect)
    deleteCookiesAndRedirect();
  }, 60*1000);
}
}
document.addEventListener('mousemove', resetInactivityTimeout);
document.addEventListener('keydown', resetInactivityTimeout);
document.addEventListener('scroll',resetInactivityTimeout)
function deleteCookiesAndRedirect() {
  // Delete all cookies
  removeCookie('session');
  removeCookie('username');
  removeCookie('id');
  removeCookie('cartItemsCount');
  removeCookie('CardId');
  alert("your session has expired")
  navigate('/Login');
}
useEffect(() => {
  resetInactivityTimeout(); // Initial setup

  return () => {
    clearTimeout(inactivityTimeout);
    document.removeEventListener('mousemove', resetInactivityTimeout);
    document.removeEventListener('keydown', resetInactivityTimeout);
    document.removeEventListener('scroll',resetInactivityTimeout)
    // Remove other event listeners if added
  };
}, []);
    return (
      <div>
       <Header/>
       <Outlet />
       <Footer/>
        
      </div>
    );
  }
  
  export default Home;
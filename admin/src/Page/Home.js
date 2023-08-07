import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Sidebar from'../Components/Sidebar';
import Footer from '../Components/footer';



function Home() {
    return (
      <div>
        <Navbar/>
         <Sidebar />
         <Outlet/> 
         <Footer/>
          
        
      </div>
    );
  }
  
  export default Home;
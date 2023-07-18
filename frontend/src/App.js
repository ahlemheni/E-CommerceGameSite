import './App.css';
import {BrowserRouter as Router,Route,Routes,useNavigate} from 'react-router-dom';
import Home from './Page/Home';
import Profile from './Components/profile/profile';
import Header from './Components/Header';
import Footer from './Components/Footer';
import NotFound from './Components/notFound/notFound';
import Spinner from './Components/spinner/spinner';
import Register from './Page/Registre';
import LandingPage from './Components/LandingPage';
import Login from './Page/Login';
import Card from './Page/card/Card';

function App() {
  return (
    <div className="App">
<Router>
  <Routes>
  <Route path="/" element={ <Home/>} >
  <Route path="" element={ <LandingPage />} />

  <Route path="profile" element={ <Profile />} />
  <Route path="Registre" element={ <Register />} />
  <Route path='Login' element={<Login />} />
  <Route path='card' element={<Card/>} />
  <Route path='*' element={<NotFound />} />
  </Route>

  </Routes>

</Router>
      
    </div>
  );
}

export default App;

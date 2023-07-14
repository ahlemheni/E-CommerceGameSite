import './App.css';
import {BrowserRouter as Router,Route,Routes,useNavigate} from 'react-router-dom';
import Home from './Page/Home';
import Profile from './Components/profile/profile';
import Header from './Components/Header';
import Footer from './Components/Footer';
import NotFound from './Components/notFound/notFound';
import Spinner from './Components/spinner/spinner';

function App() {
  return (
    <div className="App">
<Router>
  <Header></Header>
  <Routes>
  <Route path="/" element={ <Home/>} />
  <Route path="/profile" element={ <Profile />} />
  <Route path='*' element={<NotFound />} />
 
  </Routes>

<Footer></Footer>
</Router>
      
    </div>
  );
}

export default App;

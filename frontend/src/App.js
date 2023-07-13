import './App.css';
import {BrowserRouter as Router,Route,Routes,useNavigate} from 'react-router-dom';
import Home from './Page/Home';

function App() {
  return (
    <div className="App">
<Router>
  <Routes>
  <Route path="/" element={ <Home/>} />

  </Routes>


</Router>
      
    </div>
  );
}

export default App;

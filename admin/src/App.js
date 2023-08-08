import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Blank from './Page/Blank';
import Button from './Page/Button';
import Chart from './Page/Chart';
import Element from './Page/Element';
import Error404 from './Page/Error404';
import Form from './Page/Form';
import Dashboard from './Page/Dashboard';
import Home from './Page/Home';
import Signin from './Page/Signin'; 
import Table from './Page/Table';
import Typography from './Page/Typography';
import Widget from './Page/Widget';
function App() {

  return (


  
      <Router>
         
          <Routes>
          <Route path="/" element={<Signin />} >
          
             <Route path="dashboard" element={<Dashboard/>} />
             <Route path="Element" element={<Element/>} />
             <Route path="Button" element={<Button />} />
             <Route path="Typography" element={< Typography />} />
             <Route path="Widget" element={< Widget />} />
             <Route path="Form" element={<Form/>} />
             <Route path="Table" element={<Table />} />
             <Route path='Chart' element={<Chart />} />
             
             <Route path="Blank" element={<Blank />} />
             <Route path="Error404" element={<Error404/>} />
            </Route>
          </Routes>
        
      </Router>
    );
  }
  


export default App;

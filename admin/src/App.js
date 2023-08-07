import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './Page/Home';
import Blank from './Page/Blank';
import Button from './Page/Button';
import Chart from './Page/Chart';
import Element from './Page/Element';
import Error404 from './Page/Error404';
import Form from './Page/Form';
import Dashboard from './Page/Dashboard';

import Signin from './Page/Signin'; 
import Signup from './Page/Signup';
import Table from './Page/Table';
import Typography from './Page/Typography';
import Widget from './Page/Widget';
function App() {

  return (


  
      <Router>
         
          <Routes>
             <Route path="/" element={<Home />} >
             <Route path="" element={<Dashboard/>} />
             <Route path="Element" element={<Element/>} />
             <Route path="Button" element={<Button />} />
             <Route path="Typography" element={< Typography />} />
             <Route path="Widget" element={< Widget />} />
             <Route path="Form" element={<Form/>} />
             <Route path="Table" element={<Table />} />
             <Route path='Chart' element={<Chart />} />
             <Route path="Signin" element={< Signin />} />
             <Route path="Signup" element={<Signup />} />  
             <Route path="Blank" element={<Blank />} />
             <Route path="Error404" element={<Error404/>} />
            </Route>
          </Routes>
        
      </Router>
    );
  }
  


export default App;

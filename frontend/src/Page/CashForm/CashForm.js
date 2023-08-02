import React from "react";
import { MDBBtn,MDBInput} from "mdb-react-ui-kit";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';



export default function CashForm() {
 
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

  return (
    <FormControl fullWidth  noValidate >
       
    <div >
        <label >Username</label>
        <MDBInput  id="username" name="username" required />
      </div>
      <div>
      <label >Email</label>
      <MDBInput id="email" placeholder="example@example.com" name="email"type="email"required  />
      </div>
      <div>
      <label >Address</label>
      <MDBInput id="Address" placeholder="1234 Main St, City, Country"name="Address"type="Address" required />
      </div>
     
      <MDBBtn type='submit'> Send</MDBBtn>
    </FormControl>
  );
}

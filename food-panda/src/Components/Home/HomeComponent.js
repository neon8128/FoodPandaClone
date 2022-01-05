import axios from "axios";
import { useEffect, useState,useContext } from "react";
import AuthContext from '../../Context/auth-context';

import Grid from "@mui/material/Grid";

const HomeComponent = () => {
  const [name, SetName] = useState("");
  const[restaurant,SetRestaurant] = useState('');
  const context = useContext(AuthContext);  
 
   
  
    


  return(
    <Grid container component="main" sx={{ height: "100vh" }}>
    
    </Grid>
  );
};

export default HomeComponent;

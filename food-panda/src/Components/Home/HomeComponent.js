import axios from "axios";
import { useEffect, useState,useContext } from "react";
import AuthContext from '../../Context/auth-context';

import Grid from "@mui/material/Grid";

const HomeComponent = () => {
  const [name, SetName] = useState("");
  const[restaurant,SetRestaurant] = useState('');
  const context = useContext(AuthContext);  
  useEffect(async () => {
    try{
      let req = await axios("https://localhost:44321/token/get", {
      method: "GET",
      withCredentials: true,
    });
    const user = req.data;
   
    SetName(user);
    console.log(context.token);
    let get = await axios("https://localhost:44321/restaurants/getall", {
      method: "GET",
      withCredentials: true,
      headers: { Authorization: `Bearer ${context.token}` }
    });
    const restaurant = get.data;
    SetRestaurant(restaurant);
   
    }
    catch(e)
    {
      console.log(e);
    }
    
  });

  return(
    <Grid container component="main" sx={{ height: "100vh" }}>
    <div>{name? 'Hi '+name: "You are not logged in!"}</div>
    <h1>{restaurant}</h1>
    </Grid>
  );
};

export default HomeComponent;

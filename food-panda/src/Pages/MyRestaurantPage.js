import axios from "axios";
import { useState,useContext } from "react";
import { useAsync } from "react-use";
import MenuList from "../Components/RestaurantForm/MenuList.js";
import AuthContext from "../Context/auth-context";



const MyRestaurantPage = () =>{
  
  const  context = useContext(AuthContext);
  const token = context.token;
  
  const url =" https://localhost:44321/restaurants/getbyuser";
  const [result, setResult] = useState(null);
    const getRestaurant = async() =>{
      await fetch(url,{
        method: 'get',
        headers : {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
        
      .then(response => response.json())
      .then(jsonResponse => {
        setResult([jsonResponse.data][0]);
     });
    }
    let state = useAsync(getRestaurant,[]);
    if(state.loading) {return <div>Loading Restaurant</div> }
    return <MenuList restaurant={result} token={token} />
  }
  export default MyRestaurantPage;
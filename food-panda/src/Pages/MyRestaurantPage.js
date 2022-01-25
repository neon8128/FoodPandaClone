
import { useState,useContext } from "react";
import { useAsync } from "react-use";
import MenuList from "../Components/RestaurantForm/MenuList.js";
import AuthContext from "../Context/auth-context";



const MyRestaurantPage = () =>{
  
  const  context = useContext(AuthContext);
  const token = context.token;
  const user = context.username;
 
  
  
  const url = `https://localhost:44321/restaurants/GetByUser?name=${user}`;
  const [result, setResult] = useState(null);
    const getRestaurant = async() =>{
      try{
        await fetch(url,{
          method: 'get',
          headers : {
            Authorization: `Bearer ${token}`,
          },
         
        })
          
        .then(response => response.json())
        .then(jsonResponse => {
          setResult([jsonResponse.data][0]);
       });
      }
      catch(e){
        alert(e);
      }
     
    }
    let state = useAsync(getRestaurant,[]);
  
    if(state.loading) {return <div>Loading Restaurant</div> }
    if(result == null) {return <div>Not found!</div>}
    else{
      return <MenuList restaurant={result} token={token} />
    }
    
  }
  export default MyRestaurantPage;
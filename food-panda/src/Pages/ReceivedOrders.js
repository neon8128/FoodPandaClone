import Received from "../Components/Orders/Received/Received";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../Context/auth-context";
import { useAsync } from "react-use";

const initialState = {
  id: "",
  email: "",
  items: [],
  totalPrice: 0,
  totalQty: 0,
  time: "",
};

const ReceivedOrders = () => {
  const [order, setOrder] = useState([]);
  const[restaurant,setRestaurant] = useState(null);

  const context = useContext(AuthContext);
  const token = context.token;
  const manager = context.username;

    const getRestaurantId = async () =>{
        const url = `https://localhost:44321/restaurants/GetByUser?name=${manager}`;
        const config = {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          };
        try{
            await   axios.get(url,config)
            .then( async res=>{
              const getorder = `https://localhost:44321/order/restaurant/?restaurantid=${res.data.data.id}`;
              const request =  await axios.get(getorder,config);
              setOrder(request.data.data);
            })           
        }
        catch(e){
            console.log(e);
        }
          
    }
    
      useEffect(async () =>{
         await getRestaurantId();  
    },[])


  return <Received orders={order}></Received>;
};
export default ReceivedOrders;

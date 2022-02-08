import Table from "../Components/Orders/Received/OrderTable";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../Context/auth-context";



const OrdersPage = () => {
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


  return <Table orders={order}></Table>;
};
export default OrdersPage;

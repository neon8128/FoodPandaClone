import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth-context";
import Table from "../Components/Orders/Received/OrderTable";

const UserOrdersPage = () =>{

    const [orders,SetOrders] = useState([]);
  const context = useContext(AuthContext);
  const token = context.token;
  const email = context.email;

  const getOrder = async() =>{
    const url = `https://localhost:44321/order/byUser?email=${email}`;
    const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      await axios.get(url,config)
      .then(res => SetOrders(res.data.data))
      .catch(ex => console.log(ex));
  }
  useEffect( async() =>
  {
     await getOrder();
  },[])

 return <Table orders={orders}></Table>
}
export default UserOrdersPage;
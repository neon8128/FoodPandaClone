import { useParams } from "react-router-dom";
import OrderDetails from "../Components/Orders/OrderDetails";

export const OrderPage =() =>{

    const {order} = useParams();

    return (<OrderDetails id={order}></OrderDetails>);
}

export default OrderPage;
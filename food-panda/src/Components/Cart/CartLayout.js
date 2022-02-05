import React, { useContext } from "react";
import CartComponent from "./CartList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getTotals,
} from "../../features/CartSlice";
import './style.css';
import axios from "axios";
import AuthContext from "../../Context/auth-context";
import Swal from 'sweetalert2'

const CartLayout = () => {
  const items = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const context = useContext(AuthContext);
  const email = context.email;
  const token = context.token;
  

  useEffect(() => {
    dispatch(getTotals());
  }, [items, dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleCheckout = async () =>{
    
    const url = "https://localhost:44321/order/create";
   const result = [items.cartItems][0].map( ({ item, price,cartQuantity }) =>
   {
      return { 
        name:item,
        price:price,
        Quantity:cartQuantity 
      };
   });
   let config = {
    headers: {
      Authorization: 'Bearer ' + token,
      "Content-Type": "application/json"
    }
  }
  const data = {
    email:email,
    restaurantId:items.cartItems[0].restaurant_Id,
    items:
     result,
     totalPrice:items.cartTotalAmount,
     totalQty:items.cartTotalQuantity,
  };
  let json = JSON.stringify(data);
 
   try
    {
      await axios.post(url,json,config);
    }
      catch(e)
      {
        console.log(e);
      }
      handleClearCart();
      Swal.fire("Great Job!","The order was successfully sent!","success");
  }

  return (
    <div>
      <div className="text-center mt-5">
        <h1>Cart</h1>
        <p>This is the Cart Page.</p>
      </div>

      <div className="row no-gutters justify-content-center">
        <div className="col-sm-9 p-3">
          {
              items.cartItems.length > 0 ?
               <CartComponent/> :
            <div className="p-3 text-center text-muted">Your cart is empty</div>
          }

        </div>
        {
           items.cartItems.length> 0 &&
          <div className="col-sm-3 p-3">
            <div className="card card-body">
              <p className="mb-1">Total Items: {items.cartTotalQuantity}</p>
              <h4 className=" mb-3 txt-right"></h4>
              <p className="mb-1">Total Payment: {items.cartTotalAmount} RON</p>
              <h3 className="m-0 txt-right"></h3>
              <hr className="my-4" />
              <div className="text-center">
                <button type="button" className="btn btn-primary mb-2" onClick={()=>handleCheckout()}>
                  CHECKOUT
                </button>
                <button type="button" className="btn btn-outlineprimary btn-sm"
                onClick={()=>handleClearCart()}
                >
                  CLEAR
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default CartLayout;

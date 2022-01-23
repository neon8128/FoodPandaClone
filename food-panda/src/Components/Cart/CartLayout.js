import React from "react";
import { Link } from "react-router-dom";
import CartComponent from "./ProductCartList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getTotals,
} from "../../features/CartSlice";

const CartLayout = () => {
  const items = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [items, dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

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
                <button type="button" className="btn btn-primary mb-2">
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

import CartItem from "./CartItem";
import { useSelector } from "react-redux";

 export const ProductCartList = () => {
  const items = useSelector((state) => state.cart.cartItems);

  return (
    <div className="card card-body border-0">
      {items.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductCartList;

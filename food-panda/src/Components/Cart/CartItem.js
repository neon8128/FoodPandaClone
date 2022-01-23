import {
  PlusCircleIcon,
  MinusCircleIcon,
  TrashIcon,
} from "../icons/index";
const CartItem = ({ product }) => {
  //const { increase, decrease, removeProduct } = useCart();
    
  return (
    <div className="row no-gutters py-2">
      <div className="col-sm-2 p-2">
        <img
          alt={product.item}
          style={{ margin: "0 auto", maxHeight: "50px" }}
          src={product.imagePath}
          className="img-fluid d-block"
        />
      </div>
      <div className="col-sm-4 p-2">
        <h5 className="mb-1">{product.item}</h5>
        <p className="mb-1">Price: {product.price} </p>
      </div>
      <div className="col-sm-2 p-2 text-center ">
        <p className="mb-0">Qty: {product.cartQuantity}</p>
      </div>
      <div className="col-sm-4 p-2 text-right">
        <button
         // onClick={() => increase(product)}
          className="btn btn-primary btn-sm mr-2 mb-1"
        >
          <PlusCircleIcon width={"20px"} />
        </button>

        {product.cartQuantity > 1 && (
          <button
           // onClick={() => decrease(product)}
            className="btn btn-danger btn-sm mb-1"
          >
            <MinusCircleIcon width={"20px"} />
          </button>
        )}

        {product.cartQuantity === 1 && (
          <button
           // onClick={() => removeProduct(product)}
            className="btn btn-danger btn-sm mb-1"
          >
            <TrashIcon width={"20px"} />
          </button>
        )}
      </div>
    </div>
  );
};
export default CartItem;
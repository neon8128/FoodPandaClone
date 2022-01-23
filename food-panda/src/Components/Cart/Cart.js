import Cart, { useCart } from '../../hooks/useCart'
import CartItem from './CartItem';

const Cart = () => {

  const { cartItems } = useCart;

  console.log(cartItems);
    return ( 
        <div 
        // className={styles.p__container}
        >
            <div className="card card-body border-0">

                {/* {
                    cartItems.map(product => 
                         <CartItem key={product.id} product={product}/>
                        )
                } */}

            </div>
        </div>

     );
}

export default Cart;
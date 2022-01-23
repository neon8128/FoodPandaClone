import { Link } from 'react-router-dom';


import { useContext } from 'react';
import { CartContext } from '../../Context/cart-context';
import CartItem from './CartItem';

const Cart = () => {

  const { cartItems } = useContext(CartContext);

  console.log(cartItems);
    return ( 
        <div 
        // className={styles.p__container}
        >
            <div className="card card-body border-0">

                {
                    cartItems.map(product => 
                        // <CartItem key={product.id} product={product}/>
                       console.log("cart")
                        )
                }

            </div>
        </div>

     );
}

export default Cart;
import { useContext, useState, useEffect } from "react";
import { CartContext, RemoveCartContext, AddCartContext } from "../../Context/cart-context"
import CartItem from "./CartItem";


import Button from '@mui/material/Button';
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { createTheme} from '@mui/material/styles';
import { Link } from "@mui/material";

const theme = createTheme();

 const useStyles=(() => ({
    toolbar: theme.mixins.toolbar,
    title: {
      marginTop: '5%',
    },
    emptyButton: {
      minWidth: '150px',
      [theme.breakpoints.down('xs')]: {
        marginBottom: '5px',
      },
      [theme.breakpoints.up('xs')]: {
        marginRight: '20px',
      },
    },
    checkoutButton: {
      minWidth: '150px',
    },
    link: {
      textDecoration: 'none',
    },
    cardDetails: {
      display: 'flex',
      marginTop: '10%',
      width: '100%',
      justifyContent: 'space-between',
    },
  }));

const Cart = () => {
    const classes = useStyles();
    const items = useContext(CartContext);
    const removeItem = useContext(RemoveCartContext);
    const [cartTotal, setCartTotal] = useState(0);
    const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
  
    const handleClick = (e) => {
      e.preventDefault();
    };
  
    const total = () => {
      setCartTotal(items.reduce((acc, item) => acc + item.price, 0));
    };
  
      const addItems = useContext(AddCartContext);
      useEffect(()=>{
        let prev_items = JSON.parse(localStorage.getItem('cart')) || [];
        addItems(prev_items)
        setIsInitiallyFetched(true)
      },[])
  
  
    useEffect(() => {
      if(isInitiallyFetched){
        localStorage.setItem("cart", JSON.stringify(items));
        total();
      }
    }, [items]);
  
  
    const cartItems = items.map((item, index) => (
      <div>
        <span key={index}>{`${item.item}: RON${item.price}`}</span>
        <input type="button" value="-" onClick={e => removeItem(item)} />
      </div>
    ));

    const renderEmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart,
          <Link className={classes.link} to="/">start adding some</Link>!
        </Typography>
      );

    const renderCart = () => (
        <>
          <Grid container spacing={3}>
            {items.map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <CartItem item={item} 
                //  onUpdateCartQty={onUpdateCartQty}
                //   onRemoveFromCart={onRemoveFromCart} 
                  />
              </Grid>
            ))}
          </Grid>
          <div className={classes.cardDetails}>
            <Typography variant="h4">Subtotal: {items.price}</Typography>
            <div>
              <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary"
              // onClick={handleEmptyCart}
               >Empty cart</Button>
              <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
            </div>
          </div>
        </>
      );
  
    return (
    //   <div>
    //     <h2>Cart</h2>
    //     {cartItems} 
    //     <h2>Total</h2>
    //     {cartTotal}
    //   </div>
    <Container>
    <div className={classes.toolbar} />
    <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
    { !items.length ? renderEmptyCart() : renderCart() }
  </Container>
    );
  };
  export default Cart;
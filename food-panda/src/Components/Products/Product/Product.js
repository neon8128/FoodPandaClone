import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch,useSelector } from 'react-redux';
import {addToCart} from '../../../features/CartSlice'
const theme = createTheme();
//import useStyles from './styles';

const useStyles = makeStyles({
  root: {
    // maxWidth: 345, original width style
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})

const Product = ({ product}) => {
  const classes = useStyles();
  const items = useSelector((state) => state.cart);
  const dispatch = useDispatch();


  
  const deleteOtherRestaurant =() =>{

    const existingIndex = items.cartItems.findIndex(
      (item) => item.id === product.restaurant_Id
    );
    if(existingIndex>=0){
      localStorage.setItem("cartItems", []);
      alert("Deleted items from the restaurant");
    }
  }
  const handleAddToCart =() =>{
    deleteOtherRestaurant();
    dispatch(addToCart(product));
    
  }
  
  

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.imagePath} title={product.item} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.item}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {product.price} RON
          </Typography>
        </div>
       
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Button aria-label="Add to Cart" 
         onClick={() => handleAddToCart()}
        >
          <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
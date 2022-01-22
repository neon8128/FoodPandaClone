import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth-context";
import Products from "../Components/Products/Products";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAsync } from "react-use";

export const ProductsPage = () =>{

    const { restaurant } = useParams();
    const [products, setProducts] = useState([]);
    
    const context = useContext(AuthContext);
    const token = context.token;


const  getProducts = async() =>{
    const url = `https://localhost:44321/products/getall?id=${restaurant}`;

    try {
        await fetch(url,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            setProducts([jsonResponse.data][0]);
          });
        // console.log(response);
       } catch (err) {
         console.log(err);
       }
}


const state= useAsync(getProducts,[]);

  if(state.loading) {return <div>Loading</div> }
 

return(
    <Products products={products} />
);
}

export default ProductsPage;
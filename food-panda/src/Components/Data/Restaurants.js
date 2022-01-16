import { useAsync } from "react-use";
import { useEffect, useState } from "react";
import Card from "../Card/CardComponent";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';



export const Restaurants=() =>
{
    const getData = async() =>{
        await fetch("https://localhost:44321/restaurants/getall")
       .then(response => response.json())
       .then(jsonResponse => {
        return  SetRestaurants([jsonResponse.data][0]);
      });
    }
   const [restaurants, SetRestaurants] = useState([]);
    
    useEffect( async() => {
        await getData();
        
    }, [])

     
    return(
            <Box p={5} pt={15} minHeight="100vh">
          <Grid container spacing={5}>       
            {restaurants.map((mediaCard, i) => {
                console.log(mediaCard);
              return (
                <Grid key={i} item>
                  <Card {...mediaCard} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
              
    );
}
export default Restaurants;